import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Header, Footer } from "@/components/site-shell";
import { LocaleProvider } from "@/components/locale-provider";
import { ScrollReveal } from "@/components/scroll-reveal";
import { NavScroll } from "@/components/nav-scroll";
import "./globals.css";
import "./auth.css";
import "./login.css";
import "./blog.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teflseaacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "TEFL SEA Academy | Online TEFL Courses for South East Asia",
    template: "%s | TEFL SEA Academy",
  },

  description:
    "Online TEFL courses for teaching in South East Asia. 120-hour Premier, Level 5 Diploma and 30-hour Online specialist. Internationally recognised certificates, job support and placement across Thailand, Vietnam, South Korea and beyond.",

  keywords: [
    "TEFL course", "TEFL certification", "teach English abroad",
    "TEFL South East Asia", "online TEFL", "teach English Thailand",
    "teach English Vietnam", "TEFL certificate", "Level 5 TEFL",
  ],

  other: {
    "cross-origin-embedder-policy": "require-corp",
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "TEFL SEA Academy",
    title: "TEFL SEA Academy | Online TEFL Courses for South East Asia",
    description:
      "Get TEFL certified and start teaching in Thailand, Vietnam, South Korea and beyond. Online courses, job support and placement across SE Asia.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "TEFL SEA Academy — Online TEFL Courses for South East Asia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@teflseaacademy",
    title: "TEFL SEA Academy | Online TEFL Courses for South East Asia",
    description:
      "Get TEFL certified and start teaching in South East Asia. Online courses, job support and placement across Thailand, Vietnam, Korea and beyond.",
    images: ["/og-default.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: [
      { url: "/images/Favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/images/Favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/Favicon/favicon.ico", sizes: "any" },
    ],
    apple: "/images/Favicon/apple-touch-icon.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TEFL SEA Academy",
  },

  manifest: "/images/Favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body>
          <a href="#main-content" className="skip-to-content">Skip to content</a>
          <LocaleProvider>
            <Header />
            {children}
            <Footer />
          </LocaleProvider>
          {/* ScrollReveal — single global instance, mounts after hydration */}
          <ScrollReveal />
          {/* NavScroll — adds .nav-scrolled class on scroll */}
          <NavScroll />
        </body>
      </html>
    </ClerkProvider>
  );
}
