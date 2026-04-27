// ================================================================
// i18n Configuration
// All supported languages for TEFL SEA Academy
// English is the default and stays at root URL (no prefix)
// All other languages get a prefix: /th/, /id/, /ms/ etc.
// ================================================================

export const defaultLocale = "en" as const;

export const locales = [
  "en",    // English (default — no URL prefix)
  "id",    // Bahasa Indonesia
  "ms",    // Bahasa Malaysia
  "th",    // Thai
  "vi",    // Vietnamese
  "fil",   // Filipino / Tagalog
  "zh",    // Simplified Chinese
  "zh-TW", // Traditional Chinese
  "lo",    // Lao
  "km",    // Khmer (Cambodian)
  "hi",    // Hindi
  "bn",    // Bengali
  "ne",    // Nepali
  "si",    // Sinhala
] as const;

export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  "en":    "English",
  "id":    "Bahasa Indonesia",
  "ms":    "Bahasa Malaysia",
  "th":    "ภาษาไทย",
  "vi":    "Tiếng Việt",
  "fil":   "Filipino",
  "zh":    "简体中文",
  "zh-TW": "繁體中文",
  "lo":    "ພາສາລາວ",
  "km":    "ភាសាខ្មែរ",
  "hi":    "हिन्दी",
  "bn":    "বাংলা",
  "ne":    "नेपाली",
  "si":    "සිංහල",
};

export const localeFlags: Record<Locale, string> = {
  "en":    "🇬🇧",
  "id":    "🇮🇩",
  "ms":    "🇲🇾",
  "th":    "🇹🇭",
  "vi":    "🇻🇳",
  "fil":   "🇵🇭",
  "zh":    "🇨🇳",
  "zh-TW": "🇹🇼",
  "lo":    "🇱🇦",
  "km":    "🇰🇭",
  "hi":    "🇮🇳",
  "bn":    "🇧🇩",
  "ne":    "🇳🇵",
  "si":    "🇱🇰",
};

// Browser language codes that map to our locales
export const browserLangMap: Record<string, Locale> = {
  "id": "id",
  "ms": "ms",
  "th": "th",
  "vi": "vi",
  "tl": "fil",
  "fil": "fil",
  "zh": "zh",
  "zh-CN": "zh",
  "zh-SG": "zh",
  "zh-TW": "zh-TW",
  "zh-HK": "zh-TW",
  "lo": "lo",
  "km": "km",
  "hi": "hi",
  "bn": "bn",
  "ne": "ne",
  "si": "si",
  "en": "en",
};
