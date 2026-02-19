import type { Metadata } from "next";
import WorksContent from "./works-content";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected projects by Arc Studio — agent workflow builders, email platforms, and high-impact digital products.",
};

export default function WorksPage() {
  return <WorksContent />;
}
