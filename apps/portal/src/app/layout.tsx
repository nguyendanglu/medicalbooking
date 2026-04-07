import type { Metadata } from "next";
import { Manrope, Public_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Smart Clinic | The Clinical Editorial",
  description: "Giải pháp chăm sóc sức khỏe toàn diện với công nghệ hiện đại.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${manrope.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}

