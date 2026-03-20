import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProsperPals",
  description: "AI-first financial wellness app scaffold for the ProsperPals MVP."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
