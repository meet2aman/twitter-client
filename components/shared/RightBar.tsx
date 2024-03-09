"use client";
import React, { useCallback } from "react";
import SearchBar from "../sub/SearchBar";
import FeaturedCard from "../sub/FeaturedCard";
import TrendingCard from "../sub/TrendingCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useLoader } from "@/context/ContextProvider";

const RightBar = () => {
  const { setLoading }: any = useLoader();
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      setLoading(true);
      const googleToken = cred.credential;

      if (!googleToken) {
        toast.error("Google token not found !");
        throw new Error(`Credential not found !`);
      }
      const { verifyGoogleToken } = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );

      // console.log(`Verify:: ${verifyGoogleToken}`);
      toast.success("Verified Google token successfully");

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      //@ts-ignore
      await queryClient.invalidateQueries(["curent-user"]);
      setLoading(false);
    },
    [queryClient]
  );
  return (
    <>
      <div className="fixed top-0 w-[20.4%] z-50">
        <SearchBar />
      </div>

      <div className="">
        <div className="sticky top-20 mt-20 z-40">
          {
            <>
              {!user && (
                <div className="w-full -z-[999] p-3 border-[2px] border-[#16181c] rounded-xl">
                  <h3 className="text-[22px] font-[600]">
                    New to Twitter Feat. X?
                  </h3>
                  <p className="text-[12px] font-[400] text-gray-500 pb-2 tracking-wide">
                    Sign up now to get your own personalized timeline!
                  </p>

                  <div className="pb-2">
                    <GoogleLogin
                      size="large"
                      theme="filled_black"
                      width={300}
                      onSuccess={handleLoginWithGoogle}
                    />
                  </div>

                  <p className="text-[12px] tracking-wide text-gray-500">
                    By signing up, you agree to the{" "}
                    <span className="text-sky-500">Terms of Service</span> and{" "}
                    <span className="text-sky-500">Privacy policy, </span>{" "}
                    <span className="text-sky-500">Cookie Use</span>
                  </p>
                </div>
              )}
            </>
          }
          <FeaturedCard />
          <TrendingCard />
        </div>
      </div>
    </>
  );
};

export default RightBar;
