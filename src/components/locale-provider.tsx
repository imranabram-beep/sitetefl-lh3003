"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { locales, defaultLocale, browserLangMap } from "@/lib/i18n";
import { t as translate } from "@/lib/i18n";
import type { TranslationKeys } from "@/lib/i18n/translations";

const STORAGE_KEY = "tefl-sea-locale";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof TranslationKeys) => string;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key) => key as string,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && locales.includes(saved)) {
      setLocaleState(saved);
      return;
    }
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

  const t = (key: keyof TranslationKeys) => translate(locale, key);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}
