import type { Metadata } from "next";
import SiteFooter from "@/components/sections/site-footer";
import { getOpenJobs } from "@/lib/careers";
import CareersList from "./careers-list";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Arc, the all-in-one design studio for early-stage startups. Open roles in design and engineering.",
};

export const revalidate = 300;

const CareersPage = async () => {
  const jobs = await getOpenJobs();

  return (
    <div className="flex flex-col">
      <CareersList jobs={jobs} />
      <SiteFooter />
    </div>
  );
};

export default CareersPage;
