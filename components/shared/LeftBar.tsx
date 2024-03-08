import React from "react";
import { FaXTwitter } from "react-icons/fa6";
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
    <div className="sticky top-0">
      <div className="text-[1.6rem] flex items-center gap-4 rounded-full w-fit h-fit p-3 cursor-pointer hover:bg-gray-500/50  transition-all">
        <FaXTwitter className="cursor-pointer" />
      </div>
      <div className="flex flex-col gap-[16rem]">
        <div>
          {sideBarMenu.map((menu) => (
            <div
              className="flex justify-start h-fit w-fit items-center gap-4 py-3 pl-3 pr-6 mb-3 rounded-full transition-all hover:bg-gray-500/50 cursor-pointer group"
              key={menu.title}
            >
              <div className="text-[26px] group-hover:text-sky-500">
                {menu.icon}
              </div>
              <h2 className="tracking-wide text-[22px] font-[400] group-hover:text-sky-500">
                {menu.title}
              </h2>
            </div>
          ))}
          <div className="pr-5 py-5">
            <button className="text-center py-2 px-4 bg-sky-600 rounded-full w-full transition-all hover:bg-sky-500 tracking-wide">
              Tweet
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
                      height={80}
                      width={80}
                      className="object-cover rounded-full"
                      alt="profile"
                      src={user.profileImage}
                    />
                  )}
                </div>
                <div className="text-[15px] text-start ">
                  <h2 className="capitalize w-[8rem]  tracking-wide font-[700] truncate ">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-slate-500 truncate font-[400] w-[8rem] ">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div>
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
