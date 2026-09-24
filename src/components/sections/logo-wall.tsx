import Image from "next/image";
import Link from "next/link";

type WallLogo = {
  name: string;
  src: string;
  url: string;
  /** Drawn box, in px. Height is the design's; width follows the viewBox. */
  width: number;
  height: number;
};

/**
 * Marks are matched by ink, not by bounding box — Automattic's all-caps
 * wordmark carries no ascenders or descenders, so it sits a third shorter than
 * AgentMail's box to read the same size.
 */
const LOGOS: WallLogo[] = [
  {
    name: "Axiom",
    src: "/brands/axiom.svg",
    url: "https://axiom.trade",
    width: 77,
    height: 16,
  },
  {
    name: "Automattic",
    src: "/brands/automattic.svg",
    url: "https://automattic.com",
    width: 144,
    height: 11,
  },
  {
    name: "AgentMail",
    src: "/brands/agentmail.svg",
    url: "https://agentmail.to",
    width: 98,
    height: 18,
  },
  {
    name: "Orchid",
    src: "/brands/orchid.svg",
    url: "https://orchid.ai",
    width: 75,
    height: 18,
  },
  {
    name: "Sim",
    src: "/brands/sim.svg",
    url: "https://sim.ai",
    width: 37,
    height: 18,
  },
];

const cellClass =
  "flex items-center justify-center rounded-[12px] bg-[#fbfbfb] transition-colors duration-200 hover:bg-[#f2f2f2] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";

/**
 * Clients, two per row. The grid is a fixed height so the rail's bottom edge
 * never moves as the marks load.
 */
const LogoWall = () => {
  return (
    <div className="w-full">
      <h2 className="sr-only">Clients</h2>
      <ul className="grid h-[168px] grid-cols-2 grid-rows-3 gap-2 lg:h-[156px]">
        {LOGOS.map((logo) => (
          <li key={logo.name}>
            <Link
              href={`${logo.url}?ref=arc`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${logo.name} (opens in a new tab)`}
              className={`${cellClass} size-full px-3`}
            >
              <Image
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                // The drawn width, but never past the cell: height follows so a
                // narrow phone shrinks the mark instead of clipping it.
                style={{ width: logo.width }}
                className="h-auto max-w-full brightness-0"
                draggable={false}
              />
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="#works"
            className={`${cellClass} size-full px-3 text-base leading-none font-medium text-black/60 hover:text-black/80`}
          >
            &amp; more
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LogoWall;
