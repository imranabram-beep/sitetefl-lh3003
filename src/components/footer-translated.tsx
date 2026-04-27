"use client";

import { useLocaleContext } from "@/components/locale-provider";

export function FooterLabels() {
  const { t } = useLocaleContext();
  return (
    <div>
      <p className="eyebrow">SEA-ready TEFL pathways</p>
      <h3>{t("footer_tagline")}</h3>
    </div>
  );
}

export function FooterHeading({ label }: { label: "courses" | "destinations" | "blog" | "payment" }) {
  const { t } = useLocaleContext();
  const map = {
    courses:      t("footer_courses"),
    destinations: t("footer_destinations"),
    blog:         t("footer_blog"),
    payment:      t("footer_payment"),
  };
  return <h4>{map[label]}</h4>;
}
