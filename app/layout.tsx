import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const isProd = process.env.NODE_ENV === 'production';
const useStaticExport = process.env.USE_STATIC_EXPORT === 'true';
const basePath = isProd && useStaticExport ? '/real' : '';

export const metadata: Metadata = {
  title: "Ashby BART",
  description: "A transformative mixed-use development that reimagines urban living at the intersection of transit and community.",
  icons: {
    icon: `${basePath}/icon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
