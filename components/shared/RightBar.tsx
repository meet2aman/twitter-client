import React from "react";
import SearchBar from "../sub/SearchBar";
import FeaturedCard from "../sub/FeaturedCard";
import TrendingCard from "../sub/TrendingCard";

const RightBar = () => {
  return (
    <div className="">
      <SearchBar />
      <FeaturedCard />
      <TrendingCard />
    </div>
  );
};

export default RightBar;
