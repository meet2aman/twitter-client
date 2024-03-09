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
    <main className="flex lg:gap-6 text-white lg:px-40 xl:px-64 px-10">
      <div className="hidden md:block">
        <LeftBar />
      </div>
      {loading ? (
        <>
          <div className="flex justify-center items-center w-screen h-screen">
            <TwitterLottie />
          </div>
        </>
      ) : (
        <>
          <div className="xl:flex">
            <div className="xl:min-w-[75%] w-full border-x-[1px] border-[#2f3336]">
              <FeedBar />
            </div>
            <div className="xl:min-w-[47%] hidden xl:block pl-6">
              <RightBar />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
