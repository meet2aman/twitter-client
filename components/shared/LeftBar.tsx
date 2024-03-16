"use client";
import React, { useMemo } from "react";
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
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface twitterSideButton {
  title: string;
  icon: React.ReactNode;
  url: string;
}

const LeftBar = () => {
  const { user } = useCurrentUser();
  const sideBarMenu: twitterSideButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <CiHome />,
        url: "/",
      },
      {
        title: "Explore",
        icon: <CiHashtag />,
        url: "#",
      },
      {
        title: "Notifications",
        icon: <CiBellOn />,
        url: "#",
      },
      {
        title: "Messages",
        icon: <PiEnvelopeThin />,
        url: "#",
      },
      {
        title: "Bookmarks",
        icon: <CiBookmark />,
        url: "/",
      },
      {
        title: "Profile",
        icon: <CiUser />,
        url: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <CiCircleMore />,
        url: "#",
      },
    ],
    [user?.id]
  );
  return (
    <div className="sticky pb-3 pt-1 md:flex flex-col justify-between top-0 h-screen col-span-1 lg:col-span-2 border-r-[1px] border-[#2f3336] pr-3 hidden">
      <div>
        <div className="text-[2rem] flex items-center gap-4 rounded-full w-fit h-fit p-2 cursor-pointer hover:bg-gray-500/50  transition-all mb-3">
          <TwitterXLottie />
        </div>
        <div className="flex flex-col justify-between h-fit">
          <div>
            {sideBarMenu.map((menu) => (
              <Link href={menu.url} key={menu.title}>
                <div
                  className="flex cursor-pointer rounded-full lg:h-fit lg:w-fit hover:bg-gray-500/50 justify-center gap-4 mb-3 p-3 items-center transition-all group lg:pl-5"
                  key={menu.title}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="text-[26px] group-hover:text-sky-500">
                          {menu.icon}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        className="max-md:hidden max-lg:block max-xl:hidden"
                        side="right"
                      >
                        <p>{menu.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <h2 className="hidden lg:block tracking-wide text-[22px] font-[400] group-hover:text-sky-500">
                    {menu.title}
                  </h2>
                </div>
              </Link>
            ))}
            <div className="lg:pr-5 py-5 lg:pl-3 flex justify-center">
              <button className="hidden lg:block text-center py-2 px-4 bg-sky-600 rounded-full w-full transition-all hover:bg-sky-500 tracking-wide">
                Tweet
              </button>

              <button className="lg:hidden  text-center p-2 bg-sky-600 rounded-full transition-all hover:bg-sky-500 tracking-wide">
                <CreateTweet />
              </button>
            </div>
          </div>
        </div>
      </div>
      {user && (
        <div>
          <button className="w-full flex md::justify-center lg:justify-between items-center hover:bg-gray-500/50 transition-all rounded-full p-2 lg:px-2 lg:py-2">
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
                <h2 className="capitalize w-[9rem]  tracking-wide font-[700] truncate ">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-slate-500 truncate font-[400] w-[9rem] ">
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
  );
};

export default LeftBar;
