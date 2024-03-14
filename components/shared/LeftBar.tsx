"use client";
import React from "react";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { PiEnvelopeThin } from "react-icons/pi";
import { CiCircleMore } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { PiDotsThreeBold } from "react-icons/pi";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import TwitterXLottie from "@/lib/TwitterXLottie";
import CreateTweet from "../../lib/CreateTweet";
interface twitterSideButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenu: twitterSideButton[] = [
  {
    title: "Home",
    icon: <CiHome />,
  },
  {
    title: "Explore",
    icon: <CiHashtag />,
  },
  {
    title: "Notifications",
    icon: <CiBellOn />,
  },
  {
    title: "Messages",
    icon: <PiEnvelopeThin />,
  },
  {
    title: "Bookmarks",
    icon: <CiBookmark />,
  },
  {
    title: "Profile",
    icon: <CiUser />,
  },
  {
    title: "More",
    icon: <CiCircleMore />,
  },
];

const LeftBar = () => {
  const { user } = useCurrentUser();
  return (
    <div className="sticky hidden md:block top-0 h-screen col-span-1 lg:col-span-2 border-r-[1px] border-[#2f3336] pr-3">
      <div className="text-[2rem] flex items-center gap-4 rounded-full w-fit h-fit p-2 cursor-pointer hover:bg-gray-500/50  transition-all">
        <TwitterXLottie />
      </div>
      <div className="flex flex-col justify-between h-fit">
        <div>
          {sideBarMenu.map((menu) => (
            <div
              className="flex lg:justify-start justify-center h-fit w-fit items-center gap-4 py-3 max-lg:pl-5 pl-3 lg:pr-6 mb-3 rounded-full transition-all hover:bg-gray-500/50 cursor-pointer group"
              key={menu.title}
            >
              <div className="text-[26px] group-hover:text-sky-500">
                {menu.icon}
              </div>

              <h2 className="hidden lg:block tracking-wide text-[22px] font-[400] group-hover:text-sky-500">
                {menu.title}
              </h2>
            </div>
          ))}
          <div className="lg:pr-5 py-5 pl-3">
            <button className="hidden lg:block text-center py-2 px-4 bg-sky-600 rounded-full w-full transition-all hover:bg-sky-500 tracking-wide">
              Tweet
            </button>
            <button className="lg:hidden text-center p-2 bg-sky-600 rounded-full transition-all hover:bg-sky-500 tracking-wide">
              <CreateTweet />
            </button>
          </div>
        </div>
        {user && (
          <div>
            <button className="w-full flex justify-between items-center hover:bg-gray-500/50 transition-all rounded-full px-3 py-2">
              <div className="flex justify-between items-center gap-2">
                <div>
                  {user?.profileImage && (
                    <Image
                      height={50}
                      width={50}
                      className="object-cover rounded-full"
                      alt="profile"
                      src={user.profileImage}
                    />
                  )}
                </div>
                <div className="text-[15px] text-start hidden lg:block">
                  <h2 className="capitalize w-[8rem]  tracking-wide font-[700] truncate ">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-slate-500 truncate font-[400] w-[8rem] ">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="hidden lg:block">
                <PiDotsThreeBold />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
