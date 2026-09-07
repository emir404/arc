import Image from "next/image";
import { type WorkFrame as Frame, firstImage } from "@/lib/projects";

type WorkFrameProps = {
  frame: Frame;
  alt: string;
  sizes: string;
  /** Frame chrome (radius, border); the images inside are clipped to it. */
  className?: string;
  /** Load the first image eagerly (for the frame that opens above the fold). */
  eager?: boolean;
};

/**
 * One design in the works list. A page split into segments (see `WorkFrame`
 * in projects) stacks them edge to edge; each later segment overlaps the
 * previous one by a pixel so sub-pixel rounding can never open a seam.
 */
const WorkFrame = ({
  frame,
  alt,
  sizes,
  className = "",
  eager = false,
}: WorkFrameProps) => {
  const segments = Array.isArray(frame) ? frame : [frame];
  const key = firstImage(frame).src;

  return (
    <div className={`overflow-hidden ${className}`.trim()} data-frame={key}>
      {segments.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={index === 0 ? alt : ""}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading={eager && index === 0 ? "eager" : undefined}
          className={`block h-auto w-full${index > 0 ? " -mt-px" : ""}`}
        />
      ))}
    </div>
  );
};

export default WorkFrame;
