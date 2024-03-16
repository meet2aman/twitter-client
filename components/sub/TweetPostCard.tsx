"use client";
import { useCurrentUser } from "@/hooks/user";
import axios from "axios";
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
import { graphQLClient } from "@/clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/mutation/tweet";
import toast from "react-hot-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CalendarDays } from "lucide-react";

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
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate } = useCreateTweet();
  const { user } = useCurrentUser();

  // ----------- handling input file change ----------------- //
  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;
      if (file) {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file)); // Create image preview
      }
    };
  }, []);

  // ----------- handling Image selection ----------------- //
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change", handlerFn);
    input.click();
  }, [handleInputChangeFile]);

  // ----------- handling Creating Tweet ----------------- //
  const handleCreateTweet = useCallback(async () => {
    // ************ handling Image Uploading & uploading Tweet ************* //
    if (!selectedImage && content.length > 0) {
      mutate({ content, tweetImageUrl: null });
      setSelectedImage(null);
      setContent("");
      setImagePreview("");
    }
    if (selectedImage && content.length > 0) {
      const { getSignedURLForTweet } = await graphQLClient.request(
        getSignedURLForTweetQuery,
        {
          imageName: selectedImage.name,
          imageType: selectedImage.type,
        }
      );
      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, selectedImage, {
          headers: {
            "Content-Type": selectedImage.type,
          },
        });
        toast.success("Uploaded", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        mutate({ content, tweetImageUrl: myFilePath });
        setSelectedImage(null);
        setContent("");
        setImagePreview("");
      }
    }
  }, [mutate, content, selectedImage, imagePreview]);

  // ----------- handling Icon Click Dynamically ----------------- //
  const handleIconClick = (title: string) => {
    switch (title) {
      case (title = "picture"):
        handleSelectImage();
        break;
      default:
        break;
    }
  };

  return (
    <main className="mt-5">
      {user && (
        <section className="flex flex-col">
          <div className="grid grid-cols-11 gap-2 px-4">
            {user.profileImage && (
              <div className="col-span-1">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Image
                      className="rounded-full object-cover cursor-pointer"
                      src={user?.profileImage}
                      alt="user-profile"
                      width={50}
                      height={50}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80" align="center">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src={`${user.profileImage}`} />
                        <AvatarFallback className="uppercase">
                          {user?.firstName.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {user?.firstName} {user?.lastName}
                        </h4>
                        <p className="text-sm">
                          <span className="text-slate-700">{user?.email}</span>
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
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="tweet-image"
                    className="w-full rounded-xl mt-2 object-cover"
                    width={70}
                    height={80}
                  />
                )}
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
                    className="text-center bg-sky-600 transition-all hover:bg-sky-500 text-white font-[500] py-2 px-3 md:px-5 rounded-full"
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
        </section>
      )}
    </main>
  );
};

export default TweetPostCard;
