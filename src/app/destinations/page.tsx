import type { Metadata } from "next";
import { DestinationsMap } from "@/components/destinations-map";
import "@/app/destinations.css";

export const metadata: Metadata = {
  title: "Teach Abroad Destinations | TEFL SEA Academy",
  description:
    "Explore TEFL teaching destinations across South East Asia, the Middle East, Europe and beyond. Compare salaries, visa routes, demand levels and cost of living.",
};

export default function DestinationsPage() {
  return (
    <main>
      <DestinationsMap />
    </main>
  );
}
