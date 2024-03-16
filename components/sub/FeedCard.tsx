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
import { CiBookmark } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Image
                  height={50}
                  width={50}
                  className="object-cover rounded-full cursor-pointer"
                  alt="profile"
                  src={data?.author?.profileImage}
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-80" side="top">
                <div className="flex justify-between">
                  <Avatar className="w-[14%]">
                    <AvatarImage src={`${data?.author?.profileImage}`} />
                    <AvatarFallback className="uppercase">
                      {data?.author?.firstName.charAt(0)}
                      {data?.author?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 w-[80%]">
                    <Link href={`/${data.author.id}`}>
                      <h4 className="text-sm font-semibold">
                        {data?.author?.firstName} {data?.author?.lastName}
                      </h4>
                    </Link>
                    <p className="text-sm">
                      <span className="text-slate-700">
                        {data?.author?.email}
                      </span>
                      <br />
                      Hey What's up dude !
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined December 2021
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
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
                <Link href={`/${data.author?.id}`}>
                  <h5 className="text-[15px] font-[700] hover:underline transition-all decoration-sky-500">
                    {data?.author?.firstName} {data?.author?.lastName}
                  </h5>
                </Link>
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
            <p className="text-[15px] font-[400] tracking-wide pr-3 overflow-hidden">
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
            <div className="hover:bg-slate-600 p-2 rounded-full group">
              <AiOutlineMessage className="group-hover:fill-blue-300 transition-all" />
            </div>
            <button
              onClick={handleLikeClick}
              className="hover:bg-slate-600 p-2 rounded-full group"
            >
              <IoMdHeartEmpty className="group-hover:fill-rose-500 transition-all" />
            </button>
            <div className="hover:bg-slate-600 p-2 rounded-full group">
              <AiOutlineRetweet className="group-hover:fill-sky-500 transition-all" />
            </div>
            <div className="hover:bg-slate-600 p-2 rounded-full group">
              <MdOutlineFileUpload className="group-hover:fill-green-500 transition-all" />
            </div>
            <div className="hover:bg-slate-600 p-2 rounded-full group">
              <CiBookmark className="group-hover:fill-orange-500 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
