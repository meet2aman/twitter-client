import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/shared/SmoothScrolling";
import LeftBar from "@/components/shared/LeftBar";
const inter = Inter({ subsets: ["latin"] });
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

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
        <GoogleOAuthProvider clientId="761064026406-7fi8mnunns0iot2u27erqugt501r60s6.apps.googleusercontent.com">
          <Toaster />
          <SmoothScrolling>{children}</SmoothScrolling>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
