import Image from "next/image";
import React from "react";
import { PiDotsThree } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import { useCurrentUser } from "@/hooks/user";
const FeedCard: React.FC = () => {
  const { user } = useCurrentUser();
  return (
    <div>
      <div className="grid grid-cols-11 border-b-[1px] border-[#2f3336] p-4 gap-2 cursor-pointer hover:bg-slate-900/70">
        {/* avatar */}
        <div className="col-span-1">
          {user?.profileImage && (
            <Image
              height={50}
              width={50}
              className="object-cover rounded-full"
              alt="profile"
              src={user?.profileImage}
            />
          )}
        </div>
        <div className="col-span-10">
          {/* name and username contains */}
          <div className="flex justify-between items-center max-lg:mb-4 mb-3">
            <div className="flex justify-center items-start gap-1">
              <div className="lg:flex items-center gap-1">
                <h5 className="text-[15px] font-[700]">
                  {user?.firstName} {user?.lastName}
                </h5>
                <p className="text-[15px] font-[400] text-gray-500">
                  {user?.email}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <span className="lg:flex justify-center items-center">.</span>
                <p className="text-[12px] text-gray-500 text-center">Apr 28</p>
              </div>
            </div>
            <div className="hover:bg-gray-600 rounded-full p-2">
              <PiDotsThree />
            </div>
          </div>
          {/* content */}
          <div className="-mt-3">
            <p className="text-[15px] font-[400] tracking-wide">
              To truncate the content of the element if it exceeds a certain
              width and display "..." at the end, you can use Tailwind CSS
              utilities. You need to apply the truncate class to the element.
              Here's how you can do it: Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Assumenda debitis praesentium minima possimus
              repudiandae! Illo aut perferendis consequuntur, mollitia quisquam,
              numquam quas sit dolor cupiditate sequi suscipit velit saepe quis.
            </p>
          </div>
          {/* buttons */}
          <div className="flex justify-between mt-2 text-[20px] pr-8">
            <div className="hover:bg-slate-600 p-2 rounded-full">
              <AiOutlineMessage />
            </div>
            <div className="hover:bg-slate-600 p-2 rounded-full ">
              <CiHeart className="hover:fill-rose-500" />
            </div>
            <div className="hover:bg-slate-600 p-2 rounded-full">
              <AiOutlineRetweet />
            </div>
            <div className="hover:bg-slate-600 p-2 rounded-full">
              <MdOutlineFileUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
