#!/usr/bin/env node
/**
 * Verifies the email authentication records documented in docs/email-dns.md.
 *
 *   node scripts/check-email-dns.mjs [domain]
 *
 * Exits non-zero when a required record is missing or malformed, so it can gate
 * a deploy once the records are live. Needs real DNS egress.
 */

import { Resolver } from "node:dns/promises";

const DOMAIN = process.argv[2] ?? "witharc.co";
/** Google Workspace sends all human mail from the domain. */
const REQUIRED_INCLUDE = "_spf.google.com";
/** Resend's default bounce domain, where its own SPF record belongs. */
const RESEND_HOST = `send.${DOMAIN}`;

const resolver = new Resolver();
resolver.setServers(["1.1.1.1", "8.8.8.8"]);

const problems = [];
const notes = [];
/** Set by checkDmarc; decides how loudly a missing DKIM key is reported. */
let dmarcPolicy;

/** Resolves TXT records, joining the 255-char chunks DNS splits them into. */
const txt = async (host) => {
  try {
    const records = await resolver.resolveTxt(host);
    return records.map((chunks) => chunks.join(""));
  } catch (error) {
    if (error.code === "ENOTFOUND" || error.code === "ENODATA") return [];
    throw error;
  }
};

const label = (ok, text) => `${ok ? "✓" : "✗"} ${text}`;

const checkSpf = async () => {
  const records = await txt(DOMAIN);
  const spf = records.filter((record) =>
    record.toLowerCase().startsWith("v=spf1"),
  );

  if (spf.length === 0) {
    problems.push(
      `No SPF record at ${DOMAIN}. Publish: v=spf1 include:${REQUIRED_INCLUDE} ~all`,
    );
    console.log(label(false, `SPF (${DOMAIN}): missing`));
    return;
  }

  if (spf.length > 1) {
    problems.push(
      `${spf.length} SPF records at ${DOMAIN}. More than one is a permanent error — merge them into a single record.`,
    );
  }

  const record = spf[0];
  console.log(label(spf.length === 1, `SPF (${DOMAIN}): ${record}`));

  if (!record.includes(`include:${REQUIRED_INCLUDE}`)) {
    problems.push(
      `SPF at ${DOMAIN} is missing include:${REQUIRED_INCLUDE}; Google Workspace mail will fail.`,
    );
  }

  // Each include: costs one of the ten DNS lookups SPF allows.
  const lookups = (
    record.match(/\b(include|a|mx|ptr|exists|redirect)[:=]/g) ?? []
  ).length;
  if (lookups > 10) {
    problems.push(
      `SPF at ${DOMAIN} needs ${lookups} DNS lookups; anything over 10 is a permanent error.`,
    );
  }

  if (/(^|\s)[-~?+]?ptr(:|\s|$)/.test(record)) {
    problems.push(
      `SPF at ${DOMAIN} uses ptr, which receivers ignore or penalize.`,
    );
  }

  if (/[-~?+]all\b/.test(record)) {
    if (record.includes("~all")) {
      notes.push(
        "SPF ends in ~all (softfail). Tighten to -all once DMARC reports are clean.",
      );
    }
    if (record.includes("+all")) {
      problems.push(
        `SPF at ${DOMAIN} ends in +all, which authorizes every sender.`,
      );
    }
  } else {
    problems.push(
      `SPF at ${DOMAIN} has no "all" mechanism, so it authorizes nothing in particular.`,
    );
  }
};

const checkResend = async () => {
  const records = await txt(RESEND_HOST);
  const spf = records.find((record) =>
    record.toLowerCase().startsWith("v=spf1"),
  );

  if (spf) {
    console.log(label(true, `SPF (${RESEND_HOST}): ${spf}`));
    if (!spf.includes("amazonses.com")) {
      problems.push(
        `SPF at ${RESEND_HOST} does not include amazonses.com; Resend mail will fail SPF.`,
      );
    }
    return;
  }

  console.log(label(false, `SPF (${RESEND_HOST}): missing`));
  notes.push(
    `No record at ${RESEND_HOST}. Expected if the Resend domain is verified at the root — then the root SPF must include amazonses.com. See docs/email-dns.md.`,
  );
};

const checkDkim = async () => {
  for (const selector of ["google", "resend"]) {
    const hosts = [
      `${selector}._domainkey.${DOMAIN}`,
      `${selector}._domainkey.${RESEND_HOST}`,
    ];
    let published;

    for (const host of hosts) {
      const records = await txt(host);
      if (records.some((record) => record.includes("p="))) {
        published = host;
        break;
      }
    }

    if (published) {
      console.log(label(true, `DKIM (${published}): published`));
      continue;
    }

    console.log(label(false, `DKIM (${selector}._domainkey): missing`));

    // Under an enforcing policy, a forwarded message has nothing left to pass
    // on once SPF breaks, so a missing key costs real delivery.
    const message = `No ${selector} DKIM key found. SPF alone breaks on forwarded mail — see docs/email-dns.md.`;
    if (dmarcPolicy === "quarantine" || dmarcPolicy === "reject") {
      problems.push(`${message} DMARC is at p=${dmarcPolicy}.`);
    } else {
      notes.push(message);
    }
  }
};

const checkDmarc = async () => {
  const record = (await txt(`_dmarc.${DOMAIN}`)).find((entry) =>
    entry.toLowerCase().startsWith("v=dmarc1"),
  );

  if (!record) {
    console.log(label(false, `DMARC (_dmarc.${DOMAIN}): missing`));
    notes.push(
      "No DMARC policy, so SPF and DKIM failures are advisory only. Start with p=none and read the reports.",
    );
    return;
  }

  console.log(label(true, `DMARC (_dmarc.${DOMAIN}): ${record}`));
  dmarcPolicy = record.match(/\bp=(none|quarantine|reject)\b/)?.[1];

  if (dmarcPolicy === "none") {
    notes.push(
      "DMARC is p=none (monitor only). Move to p=quarantine once reports look clean.",
    );
  }
  if (/rua=mailto:[^;\s]*onsecureserver\.net/.test(record)) {
    notes.push(
      "DMARC aggregate reports go to the registrar's default address, not one you read. See docs/email-dns.md.",
    );
  }
};

console.log(`Checking email authentication for ${DOMAIN}\n`);

try {
  await checkSpf();
  await checkResend();
  // DMARC first: its policy decides how a missing DKIM key is graded.
  await checkDmarc();
  await checkDkim();
} catch (error) {
  console.error(`\nDNS lookup failed: ${error.message}`);
  console.error(
    "This check needs outbound DNS; it cannot run in a sandbox that blocks it.",
  );
  process.exit(2);
}

if (notes.length > 0) {
  console.log("\nNotes:");
  for (const note of notes) console.log(`  · ${note}`);
}

if (problems.length > 0) {
  console.log("\nProblems:");
  for (const problem of problems) console.log(`  · ${problem}`);
  process.exit(1);
}

console.log("\nAll required records present.");
