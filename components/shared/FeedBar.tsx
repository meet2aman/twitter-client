import React from "react";
import FeedCard from "../sub/FeedCard";
import { FaArrowLeft } from "react-icons/fa6";
import { useCurrentUser } from "@/hooks/user";
import TweetPostCard from "../sub/TweetPostCard";
import { useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

interface USER {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  id?: string;
  email?: string;
  __typename?: string;
}

const FeedBar = () => {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  return (
    <div className="">
      <div className="sticky top-0">
        <div className="absolute top-0 h-16 w-full bg-slate-900/40 backdrop-blur-md" />
        <div className="bg-gray-400 absolute top-0 flex px-3 lg:px-6 gap-4 items-center py-3 bg-transparent">
          <div className="p-4 hover:bg-gray-700 transition-all rounded-full cursor-pointer">
            <FaArrowLeft />
          </div>
          <div className="leading-none">
            <h2 className="text-[20px] font-[700] pb-1">Home</h2>
            <p className="text-[13px] font-[400] text-gray-400">
              Explore the Tweets
            </p>
          </div>
        </div>
      </div>
      {user && (
        <div className="pt-14 mb-20 lg:mb-0">
          <TweetPostCard />
          {tweets?.map((tweet: any) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
      )}
    </div>
  );
};

export default FeedBar;
