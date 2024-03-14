import { graphQLClient } from "@/clients/api";
import { CreateTweetInput } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetInput) =>
      graphQLClient.request(createTweetMutation, { payload }),
    onMutate: (payload) => toast.loading(`Creating tweet`, { id: "1" }),
    onSuccess: async (payload) => {
    //@ts-ignore
      await queryClient.invalidateQueries(["all-tweets"]);
      toast.success(`Created tweet successfully`, {
        id: "1",
      });
    },
  });
  return mutation;
};

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphQLClient.request(getAllTweetsQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};
