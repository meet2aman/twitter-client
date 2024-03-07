import React from "react";
import FeedCard from "../sub/FeedCard";
import { FaArrowLeft } from "react-icons/fa6";

const FeedBar = () => {
  return (
    <div className="">
      <div className="relative sticky top-0">
        <div className="absolute top-0 h-16 w-full bg-slate-900/40 backdrop-blur-md" />
        <div className="bg-gray-400 absolute top-0 flex px-6 gap-4 items-center py-3 bg-transparent">
          <div className="p-4 hover:bg-gray-700 transition-all rounded-full cursor-pointer">
            <FaArrowLeft />
          </div>
          <div className="leading-none">
            <h2 className="text-[20px] font-[700] pb-1">Aman Kushwaha</h2>
            <p className="text-[13px] font-[400] text-gray-400">99 Tweets</p>
          </div>
        </div>
      </div>
      <div className="pt-14">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />  
        <FeedCard />
      </div>
    </div>
  );
};

export default FeedBar;
