"use client";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { IoMdGlobe } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import Picker from "emoji-picker-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTweet } from "@/hooks/tweet";

const Icons = [
  {
    title: "picture",
    icon: <AiFillPicture />,
  },
  {
    title: "emoji",
    icon: <MdOutlineEmojiEmotions />,
  },
  {
    title: "calender",
    icon: <LuCalendarClock />,
  },
  {
    title: "location",
    icon: <IoLocationOutline />,
  },
  {
    title: "poll",
    icon: <BiPoll />,
  },
];

const TweetPostCard: React.FC = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [content, setContent] = useState("");
  const { mutate } = useCreateTweet();
  const { user } = useCurrentUser();
  const handleIconClick = (title: string) => {
    switch (title) {
      case (title = "picture"):
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        break;
      case (title = "emoji"):
        break;
      default:
        break;
    }
  };
  const handleCreateTweet = useCallback(() => {
    mutate({ content });
  }, []);
  const onEmojiClick = (event: any, emojiObject: any) => {
    setToggle((prev) => !prev);
    console.log(toggle);
    setChosenEmoji(emojiObject);
    console.log(emojiObject.target);
  };
  return (
    <main className="mt-5">
      {user && (
        <section className="flex flex-col">
          <div className="grid grid-cols-11 gap-2 px-4">
            {user.profileImage && (
              <div className="col-span-1">
                <Image
                  className="rounded-full object-cover"
                  src={user?.profileImage}
                  alt="user-profile"
                  width={50}
                  height={50}
                />
              </div>
            )}
            <div className="col-span-10">
              <div className="">
                <Select>
                  <SelectTrigger className="text-sky-500 w-[110px] focus:outline-none focus:border-none mb-1 tracking-wide text-sm rounded-full bg-black border-[2px] border-gray-600 px-3">
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-black text-[20px] py-6 focus:outline-none focus:ring-0 border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  name="tweet"
                  id="tweet"
                  cols={30}
                  rows={1}
                  placeholder="What's happening?"
                />
              </div>
              <div className="py-3 border-b-[1px] border-[#2f3336]">
                <div className="flex justify-start gap-2 items-center text-sky-500 hover:bg-slate-800/70 w-[200px] px-2 rounded-full transition-all cursor-pointer">
                  <IoMdGlobe />
                  <p>Everyone can reply</p>
                </div>
              </div>
              <div className="flex justify-between py-3">
                <div className="flex gap-3 justify-center text-[22px] text-sky-700 items-center">
                  {Icons.map((item) => (
                    <span
                      onClick={() => handleIconClick(item.title)}
                      className="cursor-pointer transition-all hover:bg-gray-600/60 hover:text-sky-400 p-2 rounded-full"
                      key={item.title}
                    >
                      {item.icon}
                    </span>
                  ))}
                </div>
                <div>
                  <button
                    onClick={handleCreateTweet}
                    className="text-center bg-sky-700 transition-all hover:bg-sky-500 text-white font-[500] py-2 px-5 rounded-full"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 border-y-[1px] border-[#2f3336] group cursor-pointer transition-all hover:bg-slate-900/70">
            <span className="text-center block text-[15px] text-sky-700 transition-all group-hover:text-sky-400">
              Show 70 Tweets
            </span>
          </div>
          {toggle && <Picker onEmojiClick={onEmojiClick} />}
        </section>
      )}
    </main>
  );
};

export default TweetPostCard;
