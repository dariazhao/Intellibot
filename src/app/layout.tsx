import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intellibot — Competitive Intelligence Hub",
  description: "Self-serve competitive intelligence for enterprise sales teams",
  openGraph: {
    title: "Intellibot — Competitive Intelligence Hub",
    description: "Self-serve competitive intelligence for enterprise sales teams",
    siteName: "Intellibot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intellibot — Competitive Intelligence Hub",
    description: "Self-serve competitive intelligence for enterprise sales teams",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.className} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
