import type { Metadata } from "next";
import { JobsClient } from "@/components/jobs-client";
import { JobsHeader } from "@/components/jobs-header";
import "@/app/jobs.css";

export const metadata: Metadata = {
  title: "TEFL & ESL Teaching Jobs Worldwide | TEFL SEA Academy",
  description:
    "Find live TEFL and ESL teaching jobs across South East Asia, the Middle East, Europe, the Americas and beyond. Filter by country, job type and salary. Updated daily from Adzuna and Jooble.",
  keywords: [
    "TEFL jobs","ESL jobs","teaching jobs Asia","teaching jobs UAE","teaching jobs UK",
    "English teacher jobs worldwide","TEFL abroad","teach English abroad",
    "ESL teacher jobs","language teacher jobs","teaching jobs Middle East",
    "teaching jobs South Korea","teaching jobs Thailand","teaching jobs Vietnam",
  ],
  openGraph: {
    title: "TEFL & ESL Teaching Jobs Worldwide",
    description: "Live teaching job listings across 35+ countries. South East Asia, Middle East, Europe, Americas and more.",
    type: "website",
  },
};

export default function JobsPage() {
  return (
    <main>
      <JobsHeader />
      <JobsClient />
    </main>
  );
}
