import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/sections/site-footer";
import { getJob } from "@/lib/careers";
import ApplyForm from "./apply-form";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Careers" };
  return { title: job.title, description: job.summary };
};

/**
 * Job descriptions are plain text with a light structure:
 * "## " starts a section heading, "- " starts a bullet,
 * blank lines separate paragraphs.
 */
type Block =
  | { key: string; type: "heading"; text: string }
  | { key: string; type: "paragraph"; text: string }
  | { key: string; type: "list"; items: { key: string; text: string }[] };

const parseDescription = (description: string): Block[] => {
  const blocks: Block[] = [];
  let list: { key: string; text: string }[] | null = null;
  let paragraph: { start: number; lines: string[] } | null = null;

  const flush = () => {
    if (paragraph) {
      blocks.push({
        key: `p-${paragraph.start}`,
        type: "paragraph",
        text: paragraph.lines.join(" "),
      });
      paragraph = null;
    }
    if (list?.length) {
      blocks.push({ key: `ul-${list[0].key}`, type: "list", items: list });
    }
    list = null;
  };

  description
    .replaceAll("\r\n", "\n")
    .split("\n")
    .forEach((raw, lineNo) => {
      const line = raw.trim();
      if (!line) {
        flush();
        return;
      }
      if (line.startsWith("## ")) {
        flush();
        blocks.push({
          key: `h-${lineNo}`,
          type: "heading",
          text: line.slice(3),
        });
        return;
      }
      if (line.startsWith("- ")) {
        if (paragraph) flush();
        list ??= [];
        list.push({ key: `li-${lineNo}`, text: line.slice(2) });
        return;
      }
      if (list) flush();
      paragraph ??= { start: lineNo, lines: [] };
      paragraph.lines.push(line);
    });
  flush();

  return blocks;
};

const JobPage = async ({ params }: Props) => {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  return (
    <div className="flex flex-col">
      <section className="flex flex-col bg-white px-5 py-20 md:px-12 lg:px-24">
        <div className="flex w-full max-w-[640px] flex-col gap-12">
          <div className="flex flex-col items-start gap-7">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 rounded-sm py-1 text-base font-light leading-none text-black/50 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <ArrowLeft aria-hidden className="size-4" />
              All roles
            </Link>
            <div className="flex flex-col gap-4">
              <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-black text-balance">
                {job.title}
              </h1>
              <p className="text-base font-light leading-[1.4] text-black/50">
                {job.team} · {job.location} · {job.employment_type}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {parseDescription(job.description).map((block) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={block.key}
                    className="mt-3 scroll-mt-24 text-xl font-[450] leading-[1.3] tracking-[-0.01em] text-black first:mt-0"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul
                    key={block.key}
                    className="flex list-disc flex-col gap-2 pl-5 marker:text-black/30"
                  >
                    {block.items.map((item) => (
                      <li
                        key={item.key}
                        className="text-lg font-light leading-[1.4] text-black/75 text-pretty"
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={block.key}
                  className="text-lg font-light leading-[1.4] text-black/75 text-pretty"
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="border-t border-black/10 pt-12">
            <ApplyForm jobSlug={job.slug} jobTitle={job.title} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default JobPage;
