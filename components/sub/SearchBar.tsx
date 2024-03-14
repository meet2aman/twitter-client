import React from "react";
import { CiSearch } from "react-icons/ci";
const SearchBar: React.FC = () => {
  return (
    <div className="sticky top-0 bg-black py-3 z-50">
      <div className="bg-[#16181c] py-2 rounded-full px-3 flex justify-between gap-[13.6rem] items-center">
        <div>
          <CiSearch className="text-gray-600" />
        </div>
        <div className="text-[15px] font-[400] text-gray-600">Search</div>
      </div>
    </div>
  );
};

export default SearchBar;
