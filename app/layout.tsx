import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/shared/SmoothScrolling";
import LeftBar from "@/components/shared/LeftBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter",
  description: "Twitter in my Way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
