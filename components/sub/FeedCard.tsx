"use client";
import Image from "next/image";
import React from "react";
import { PiDotsThree } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import { useCurrentUser } from "@/hooks/user";
import { Tweet } from "@/gql/graphql";
import { Span } from "next/dist/trace";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {

  const { data } = props;
  const { user } = useCurrentUser();
  const handleLikeClick = () => {
    // if (tweet.isLiked) {
    //   // Unlike if already liked
    //   unlikeMutation.mutate({ tweetId: tweet.id });
    // } else {
    //   // Like if not liked
    //   likeMutation.mutate({ tweetId: tweet.id });
    // }
  };
  return (
    <div>
      <div className="grid grid-cols-11 border-b-[1px] border-[#2f3336] p-4 gap-2 cursor-pointer hover:bg-slate-900/70">
        {/* avatar */}
        <div className="col-span-1">
          {data?.author?.profileImage ? (
            <Image
              height={50}
              width={50}
              className="object-cover rounded-full"
              alt="profile"
              src={data?.author?.profileImage}
            />
          ) : (
            <>
              <div className="border px-1 py-2 border-white rounded-full text-white">
                {data?.author?.firstName.charAt(0).toUpperCase()}
                {data?.author?.lastName && (
                  <span>{data?.author?.lastName.charAt(0).toUpperCase()}</span>
                )}
              </div>
            </>
          )}
        </div>
        <div className="col-span-10">
          {/* name and username contains */}
          <div className="flex justify-between items-center max-lg:mb-4 mb-3">
            <div className="flex justify-center items-start gap-1">
              <div className="lg:flex items-center gap-1">
                <h5 className="text-[15px] font-[700]">
                  {data?.author?.firstName} {data?.author?.lastName}
                </h5>
                <p className="text-[15px] truncate w-[130px] font-[400] text-gray-500">
                  {data?.author?.email}
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
              {data?.content}
            </p>

            {data?.tweetImageUrl && (
              <Image
                className="w-full rounded-xl mt-2 object-cover"
                width={70}
                height={80}
                alt="tweet-pic"
                src={data?.tweetImageUrl}
              />
            )}
          </div>
          {/* buttons */}
          <div className="flex justify-between mt-2 text-[20px] pr-8">
            <div className="hover:bg-slate-600 p-2 rounded-full">
              <AiOutlineMessage />
            </div>
            <button
              onClick={handleLikeClick}
              className="hover:bg-slate-600 p-2 rounded-full "
            >
              <IoMdHeartEmpty className="hover:fill-rose-500" />
            </button>
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
