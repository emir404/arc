/**
 * One-off: create the careers application database in Notion.
 *
 * Usage (tsx is not a project dependency; run it on demand):
 *
 *   NOTION_TOKEN=secret_xxx \
 *   NOTION_PARENT_PAGE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
 *   npx tsx scripts/setup-notion.ts
 *
 * The integration must be shared with the parent page first. On success the
 * new database ID is printed — copy it into NOTION_DATABASE_ID in your env.
 */

import { Client } from "@notionhq/client";

import {
  OPEN_TO_OPTIONS,
  STATUS_OPTIONS,
  STRENGTH_OPTIONS,
  TOOL_OPTIONS,
} from "../src/lib/careers-schema";

// Match the API version pinned by the app (src/lib/notion.ts) so the schema
// and the runtime writes stay in agreement.
const NOTION_VERSION = "2022-06-28";

async function main() {
  const auth = process.env.NOTION_TOKEN;
  const parentPageId = process.env.NOTION_PARENT_PAGE_ID;

  if (!auth) throw new Error("NOTION_TOKEN is required.");
  if (!parentPageId) throw new Error("NOTION_PARENT_PAGE_ID is required.");

  const notion = new Client({ auth, notionVersion: NOTION_VERSION });

  const selectOptions = (names: readonly string[]) => ({
    options: names.map((name) => ({ name })),
  });

  // The SDK v5 types describe the 2025-09-03 data-source API, but the client is
  // pinned to 2022-06-28 (above), where this classic body is correct at runtime.
  const createParams = {
    parent: { type: "page_id", page_id: parentPageId },
    title: [{ type: "text", text: { content: "Design Applications" } }],
    properties: {
      Name: { title: {} },
      Email: { email: {} },
      Location: { rich_text: {} },
      Portfolio: { url: {} },
      X: { url: {} },
      "Other links": { rich_text: {} },
      Strengths: { multi_select: selectOptions(STRENGTH_OPTIONS) },
      "Proudest project": { rich_text: {} },
      Tools: { multi_select: selectOptions(TOOL_OPTIONS) },
      "Open to": { select: selectOptions(OPEN_TO_OPTIONS) },
      "Start date": { date: {} },
      Compensation: { rich_text: {} },
      Notes: { rich_text: {} },
      Status: { select: selectOptions(STATUS_OPTIONS) },
    },
    // biome-ignore lint/suspicious/noExplicitAny: classic create body; see note above.
  } as any;

  const database = await notion.databases.create(createParams);

  console.log("\nDatabase created.");
  console.log(`NOTION_DATABASE_ID=${database.id}\n`);
}

main().catch((error) => {
  console.error("Failed to create the Notion database:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
