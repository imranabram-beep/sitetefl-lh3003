"use client";

import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { locales, defaultLocale, browserLangMap } from "@/lib/i18n";

const STORAGE_KEY = "tefl-sea-locale";

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Check saved preference first
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && locales.includes(saved)) {
      setLocaleState(saved);
      return;
    }
    // Auto-detect from browser
    const browserLang = navigator.language || navigator.languages?.[0] || "en";
    const detected = browserLangMap[browserLang]
      ?? browserLangMap[browserLang.split("-")[0]]
      ?? defaultLocale;
    setLocaleState(detected);
  }, []);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem(STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
  };

  return { locale, setLocale };
}
