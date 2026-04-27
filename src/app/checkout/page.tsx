import { courses } from "@/lib/data";
import { CheckoutPageClient } from "@/components/checkout-client";

type Props = {
  searchParams: Promise<{ course?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const { course: courseSlug } = await searchParams;
  const selectedCourse = courses.find((c) => c.slug === courseSlug) ?? courses[0];

  return <CheckoutPageClient course={selectedCourse} allCourses={courses} />;
}
