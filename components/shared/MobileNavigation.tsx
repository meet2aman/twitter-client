"use client";
import { useCurrentUser } from "@/hooks/user";
import CreateTweet from "@/lib/CreateTweet";
import TwitterXLottie from "@/lib/TwitterXLottie";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { CiBookmark, CiHashtag, CiHome, CiUser } from "react-icons/ci";

interface twitterSideButton {
  title: string;
  icon: React.ReactNode;
  url: string;
}
const MobileNavigation: React.FC = () => {
  const { user } = useCurrentUser();
  const mobileIcon: twitterSideButton[] = useMemo(
    () => [
      {
        title: "create-tweet",
        icon: <CreateTweet />,
        url: "#",
      },
      {
        title: "Explore",
        icon: <CiHashtag />,
        url: "/search",
      },
      {
        title: "X",
        icon: <TwitterXLottie />,
        url: "/",
      },

      {
        title: "Bookmarks",
        icon: <CiBookmark />,
        url: "#",
      },
      {
        title: "Profile",
        icon: <CiUser />,
        url: `/${user?.id}`,
      },
    ],
    [user?.id]
  );

  return (
    <>
      <div className="md:hidden fixed bottom-0 w-full">
        <div className="absolute bottom-0 h-[4.9rem] -z-50 w-full rounded-t-lg bg-slate-900/40 backdrop-blur-md" />
        <div className=" bg-transparent flex gap-2 justify-between text-4xl rounded-t-lg border-t-[1px] border-[#368af1] items-center p-2 z-50">
          {mobileIcon.map((item) => (
            <Link key={item.title} href={item.url}>
              <span key={item.title}>
                {item.title === "Profile" && user ? (
                  <>
                    {user.profileImage && (
                      <Image
                        className="rounded-full"
                        src={user.profileImage}
                        alt="Profile Image"
                        width={35}
                        height={35}
                      />
                    )}
                  </>
                ) : (
                  item.icon
                )}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
