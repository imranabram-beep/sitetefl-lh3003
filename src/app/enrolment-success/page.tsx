import { Suspense } from "react";
import { EnrolmentSuccessClient } from "@/components/enrolment-success-client";

export default function EnrolmentSuccessPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: "70vh" }} />}>
      <EnrolmentSuccessClient />
    </Suspense>
  );
}
