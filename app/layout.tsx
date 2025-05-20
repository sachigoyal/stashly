import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@radix-ui/react-tooltip";
import { Providers } from "./provider";
import { siteConfig } from "@/lib/config/site.config";
import { cn } from "@/lib/utils";

const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontHeading = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.name,
  icons: [
    {
      url: "/favicon-light.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/favicon-dark.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.origin,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.og,
        width: 2880,
        height: 1800,
        alt: siteConfig.name,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.socials.x,
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      url: siteConfig.og,
      width: 2880,
      height: 1800,
      alt: siteConfig.name,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontHeading.variable,
            fontMono.variable
          )}
        >
          <Providers
            themeProps={{
              attribute: "class",
              defaultTheme: "system",
              enableSystem: true,
              disableTransitionOnChange: true
            }}
          >
            <Provider>
              {children}
            </Provider>
          </Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
