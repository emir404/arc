# Email DNS for witharc.co

`witharc.co` publishes no SPF record, so nothing tells a receiving server which
hosts may send mail as `@witharc.co`.

That is worse than it sounds here, because a DMARC policy is already live at
`p=quarantine` and no Google DKIM key is published either. Mail sent from the
Google Workspace mailboxes (`emir@`, `hello@`, `omeroztok@`) fails both DMARC
checks, so every receiver honoring that policy is entitled to put it straight in
spam — and confirmed in practice: mail from `emir@witharc.co` lands in spam.
Publishing the records below fixes it. Section 4 explains the mechanism.

These records live at the DNS provider, not in this repo. Publish them there,
then verify with `npm run email:check`.

## Measured state (2026-09-16, via `npm run email:check`)

| Record | Status |
| --- | --- |
| `witharc.co` SPF | **missing** |
| `google._domainkey` (Workspace DKIM) | **missing** — no key on any common selector |
| `send.witharc.co` SPF | `v=spf1 include:amazonses.com ~all` |
| `resend._domainkey.witharc.co` | published |
| `_dmarc.witharc.co` | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` |

Who sends as the domain: Google Workspace (`MX 1 smtp.google.com`) for human
mail, and Resend for the careers notifications in
`src/app/api/careers/apply/route.ts`. Cal.com is an embed only, Supabase auth
mail goes out from Supabase's own domain, and the Vercel Blob token never
touches email.

DNS is hosted at GoDaddy (`ns07/ns08.domaincontrol.com`), so the steps below are
GoDaddy's: **Domain portfolio → witharc.co → DNS → Add New Record**.

## 1. SPF (the missing record)

| Field | Value |
| --- | --- |
| Type | `TXT` |
| Name | `@` |
| Value | `v=spf1 include:_spf.google.com ~all` |
| TTL | `1 hour` |

`include:_spf.google.com` authorizes Google Workspace, which sends all the human
mail. `~all` (softfail) marks everything else as suspicious without asking for
outright rejection — the right setting while you confirm no legitimate sender
was missed.

**Resend does not belong in this record.** Its domain is verified on the
subdomain (`send.witharc.co`, eu-west-1), which carries its own
`include:amazonses.com` SPF record and its own bounce MX. Because the live DMARC
policy uses relaxed alignment (`aspf=r`), a pass on the subdomain already aligns
with the organizational domain, so careers mail authenticates today and keeps
working untouched. Adding `include:amazonses.com` at the root would authorize
every Amazon SES tenant to send as `witharc.co` and buy nothing.

### Rules worth not breaking

- **Exactly one `v=spf1` record** at the root. Two SPF records are a permanent
  error and fail harder than having none. The root TXT currently holds only a
  `google-site-verification=…` string — leave that one alone, it is unrelated.
- **Ten DNS lookups, maximum**, counting each `include:`. One leaves plenty of
  room.
- **Never add `ptr`**, and don't paste a third party's record wholesale.
- **SPF does not inherit.** A subdomain with no record of its own is unprotected.
- After a couple of weeks of clean DMARC reports, tighten `~all` to `-all`.

## 2. Google Workspace DKIM

Not optional at `p=quarantine`: SPF breaks whenever a message is forwarded, and
DKIM is the only check that survives it. Admin console → Apps → Google Workspace
→ Gmail → Authenticate email. Generate a 2048-bit key for `witharc.co`, publish
the TXT it hands you at `google._domainkey`, wait for it to resolve, then click
**Start authentication** — the last step is easy to forget and nothing is signed
until it's done.

## 3. Point DMARC reports at yourself

The existing policy is GoDaddy's default, and its `rua=` sends every aggregate
report to `dmarc_rua@onsecureserver.net` — an address you don't control, so you
have never seen the failures described above. Edit the `_dmarc` TXT record to a
mailbox you read:

```
v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc@witharc.co; fo=1
```

Keep `p=quarantine` once SPF and DKIM are live. If you would rather not risk
delivery while the two records propagate, drop to `p=none` first and restore
`p=quarantine` after a clean week of reports.

## 4. Why mail from the mailboxes lands in spam

Both DMARC checks fail on every message, and the policy already says what to do
about that.

- **SPF** has no record to evaluate, so the check returns `none`. Nothing to
  align.
- **DKIM** looks like it passes, which is why this is easy to misread. With no
  custom key published, Google Workspace still signs outbound mail — with its
  own fallback key, `d=witharc-co.<date>.gappssmtp.com`. The signature is valid,
  but the signing domain isn't `witharc.co`, so it does not align and DMARC
  ignores it.
- **DMARC** therefore evaluates `fail` against `p=quarantine`, and quarantine
  means the spam folder. Gmail and Microsoft 365 both honor it.

The domain is not on Spamhaus DBL, SURBL or NordSpam, so this is an
authentication failure rather than a reputation one. Order of operations:

1. **Publish the SPF record** (section 1). Direct mail starts passing DMARC via
   SPF as soon as it propagates — minutes to an hour on the TTL above. This is
   the one that stops the bleeding.
2. **Enable Workspace DKIM** (section 2). Needed for mail that gets forwarded or
   passes through a mailing list, where SPF breaks by design. Remember the
   **Start authentication** click — until then Google keeps using the
   `gappssmtp.com` fallback and nothing changes.
3. **Repoint `rua=`** (section 3) so the next failure is visible without anyone
   reporting it by hand.

Confirm the fix by mailing a Gmail address and opening **Show original**. The
header block should read `SPF: PASS`, `DKIM: PASS` and `DMARC: PASS`, with
`mailed-by`/`signed-by` both showing `witharc.co` — not `gappssmtp.com`.
[mail-tester.com](https://www.mail-tester.com) gives the same answer with a
score attached.

Placement may lag the fix by a few days where recipients or their providers have
already learned to distrust the domain. Don't send anything bulk from it while
that settles, and it's worth asking the handful of people whose threads matter
most to mark an existing message **Not spam** and add the address to their
contacts.

## 5. Verify

```bash
npm run email:check
```

It resolves the live records and reports what is missing, exiting non-zero on a
real problem. Give DNS up to an hour (the TTL above) before trusting a negative
result. Pass another domain as an argument to check one:
`npm run email:check -- example.com`.

Second opinions: [MXToolbox SPF check](https://mxtoolbox.com/spf.aspx), or
`dig +short TXT witharc.co`.
