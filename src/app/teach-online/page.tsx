import type { Metadata } from "next";
import { TeachOnlineContent } from "@/components/teach-online-content";

export const metadata: Metadata = {
  title: "Teach English Online | Work from Anywhere with TEFL",
  description: "Build a remote English teaching income from anywhere in South East Asia. Platform comparison, earnings guide and how a TEFL certificate helps you get started.",
  keywords: ["teach English online","online ESL jobs","work from home English teacher","online TEFL jobs","teach English remotely Asia"],
};

export default function TeachOnlinePage() {
  return <TeachOnlineContent />;
}
