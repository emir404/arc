import { Client } from "@notionhq/client";

import type { ApplicationInput } from "@/lib/careers-schema";

/**
 * Server-only. This module reads NOTION_TOKEN and must never be imported into a
 * client component. It is used by the careers server action and the one-off
 * setup script.
 *
 * The Notion SDK v5 defaults to the 2025-09-03 API (data sources). We pin to
 * 2022-06-28 so the classic `pages.create({ parent: { database_id } })` shape
 * and the property schema below map directly to the task's database.
 */
export const NOTION_VERSION = "2022-06-28";

export function getNotionClient() {
  const auth = process.env.NOTION_TOKEN;
  if (!auth) {
    throw new Error("NOTION_TOKEN is not set.");
  }
  return new Client({ auth, notionVersion: NOTION_VERSION });
}

const richText = (content: string) => ({
  rich_text: [
    { type: "text" as const, text: { content: content.slice(0, 2000) } },
  ],
});

/** Create one application row. Throws on API failure so the caller can surface it. */
export async function createApplication(input: ApplicationInput) {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not set.");
  }

  const notion = getNotionClient();

  const properties: Record<string, unknown> = {
    Name: { title: [{ type: "text", text: { content: input.fullName } }] },
    Email: { email: input.email },
    Location: richText(input.location),
    Portfolio: { url: input.portfolio },
    Strengths: {
      multi_select: input.strengths.map((name) => ({ name })),
    },
    "Proudest project": richText(input.proudestProject),
    Tools: { multi_select: input.tools.map((name) => ({ name })) },
    "Open to": { select: { name: input.openTo } },
    "Start date": { date: { start: input.startDate } },
    Status: { select: { name: "New" } },
  };

  if (input.xProfile) properties.X = { url: input.xProfile };
  if (input.otherLinks) properties["Other links"] = richText(input.otherLinks);
  if (input.compensation)
    properties.Compensation = richText(input.compensation);
  if (input.notes) properties.Notes = richText(input.notes);

  await notion.pages.create({
    parent: { database_id: databaseId },
    // biome-ignore lint/suspicious/noExplicitAny: property union is broad; shapes validated above.
    properties: properties as any,
  });
}
