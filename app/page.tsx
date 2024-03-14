"use client";
import LeftBar from "@/components/shared/LeftBar";
import RightBar from "@/components/shared/RightBar";
import FeedBar from "@/components/shared/FeedBar";
import { useLoader } from "@/context/ContextProvider";
import Image from "next/image";
import TwitterLottie from "../lib/TwitterLottie";
import React from "react";

export default function Home() {
  const { loading, setLoading }: any = useLoader();
  React.useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 2000);
  });

  
  return (
    <main className="lg:col-span-7 col-span-8 md:grid grid-cols-10 text-white">
      {loading ? (
        <>
          <div className="flex md:col-span-10 md:pl-[13em] justify-center items-center w-full h-screen">
            <TwitterLottie />
          </div>
        </>
      ) : (
        <>
          <div className="xl:col-span-6 sm:col-span-10  w-full border-x-[1px] border-[#2f3336]">
            <FeedBar />
          </div>
          <div className="xl:col-span-4 hidden xl:block pl-6">
            <RightBar />
          </div>
        </>
      )}
    </main>
  );
}
