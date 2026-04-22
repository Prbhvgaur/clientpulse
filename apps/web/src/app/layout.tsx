import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4 } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ClientPulse",
    template: "%s | ClientPulse",
  },
  description: "Branded real-time project status pages for freelancers and agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full bg-background antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
