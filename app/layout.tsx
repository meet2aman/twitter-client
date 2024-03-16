import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/shared/SmoothScrolling";
const inter = Inter({ subsets: ["latin"] });
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoaderProvider } from "@/context/ContextProvider";
import LeftBar from "@/components/shared/LeftBar";
import MobileNavigation from "../components/shared/MobileNavigation";
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
          <ReactQueryProvider>
            <LoaderProvider>
              <Toaster />
              <SmoothScrolling>
                <main className="2xl:px-[15.5rem] xl:px-[9rem] lg:px-[7rem] md:px-[3rem] md:grid grid-cols-9">
                  <LeftBar />
                  {children}
                  <MobileNavigation />
                </main>
              </SmoothScrolling>
              {/* <ReactQueryDevtools /> */}
            </LoaderProvider>
          </ReactQueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
