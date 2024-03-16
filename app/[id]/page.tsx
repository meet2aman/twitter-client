"use client";
import { useCurrentUser, useGetUserById } from "@/hooks/user";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedCard from "@/components/sub/FeedCard";
import { Tweet } from "@/gql/graphql";
import { usePathname } from "next/navigation";

const UserProfilePage: NextPage = () => {
  const words = [
    {
      text: "Welcome",
      className: "text-white",
    },
    {
      text: "to",
      className: "text-white",
    },

    {
      text: "X.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const pathname = usePathname();
  const id = pathname.slice(1);
  const { userById } = useGetUserById(id);

  return (
    <div className="col-span-7 w-ful grid grid-cols-12 lg:gap-4">
      {/* Mid section */}

      <div className="lg:col-span-8 col-span-12 md:border-r-[1px] border-[#2f3336]">
        {/* TopBar */}
        <div className="sticky top-0 z-50">
          <div className="absolute top-0 h-16 w-full bg-slate-900/40 backdrop-blur-md" />
          <div className="bg-gray-400 absolute top-0 flex px-6 gap-4 items-center py-3 bg-transparent">
            <Link href={"/"}>
              <div className="p-4 hover:bg-gray-700 transition-all rounded-full cursor-pointer">
                <FaArrowLeft />
              </div>
            </Link>

            <div className="leading-none">
              <h2 className="text-[20px] font-[700]">
                {userById?.firstName} {userById?.lastName}
                <p className="text-[13px] font-[400] text-gray-400 mt-1">
                  {userById?.tweets?.length} tweets
                </p>
              </h2>
            </div>
          </div>
        </div>
        {/* Profile section */}
        <div className="mt-[4rem] relative">
          <div className="h-[200px] bg-black/70 flex justify-center items-center border-b-[1px] border-[#2f3336]">
            <TypewriterEffect
              words={words}
              className="text-center max-lg:text-[2rem]"
              cursorClassName="max-lg:h-[1.5rem]"
            />
          </div>
          <div className="absolute top-[8rem] rounded-full flex justify-between w-full items-end lg:px-5 px-3">
            <div className="bg-blue-500 rounded-full p-1 scale-[0.8] lg:scale-[1]">
              {userById?.profileImage && (
                <Image
                  src={userById?.profileImage}
                  alt="profile-image"
                  height={130}
                  width={130}
                  className="rounded-full "
                />
              )}
            </div>
            <div className="pb-[1rem] lg:pb-0">
              <button className="px-4 py-2 text-sm tracking-wide bg-transparent rounded-full border-[1.5px] hover:text-opacity-70 hover:border-opacity-50 text-white font-[500]">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="mt-20 px-5">
            <h1 className="text-xl font-[500]">
              {userById?.firstName} {userById?.lastName}
            </h1>
            <p className="text-slate-500">@{userById?.email}</p>
            <h1 className="mt-4">
              Building This <span className="text-sky-500">Twitter</span> Feat
              X. for You Guys !
            </h1>
            <div className="flex justify-start gap-5 items-center">
              <div className="flex justify-start gap-1 items-center mt-2">
                <p>227</p>
                <p className="text-slate-500">Followers</p>
              </div>
              <div className="flex justify-start gap-1 items-center mt-2">
                <p>101</p>
                <p className="text-slate-500">Following</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full">
          <Tabs defaultValue="tweets" className="w-full">
            <TabsList className="gap-4 lg:gap-10 justify-around text-[20px] w-full bg-black border-y-[1px] border-[#2f3336] !py-7 rounded-none">
              <TabsTrigger value="tweets">Tweets</TabsTrigger>
              <TabsTrigger value="replies">Replies</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>
            <TabsContent value="tweets" className="mb-20 lg:mb-0">
              {userById?.tweets?.map((tweet: any) => (
                <FeedCard data={tweet as Tweet} key={tweet?.id} />
              ))}
            </TabsContent>
            <TabsContent value="replies">
              Change your password here.
            </TabsContent>
            <TabsContent value="media">Change your password here.</TabsContent>
            <TabsContent value="likes">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Feed section */}

      {/* Right Section */}
      <div className="lg:col-span-4 hidden lg:block">right</div>
    </div>
  );
};

export default UserProfilePage;
