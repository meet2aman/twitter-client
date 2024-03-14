import { graphQLClient } from "@/clients/api";
import { CreateLikeInput } from "@/gql/graphql";
import {
  createLikeMutation,
  deleteLikeMutation,
} from "@/graphql/mutation/like";
import { getAllLikesCountQuery } from "@/graphql/query/like";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateLike = () => {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: (payload: CreateLikeInput) =>
      graphQLClient.request(createLikeMutation, { payload }),
    onSuccess: () => {
      queryClient.invalidateQueries("likeCounts"); // Invalidate the like count query to refetch data
      toast.success(`Liked`);
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: (payload: DeleteLikeInput) =>
      graphQLClient.request(deleteLikeMutation, { payload }), // Call the delete like mutation function
    onSuccess: () => {
      queryClient.invalidateQueries("likeCounts"); // Invalidate the like count query to refetch data
      toast.success(`Unliked`);
    },
  });

  return { likeMutation, unlikeMutation };
};

export const useGetLikeCounts = () => {
  const query = useQuery({
    queryKey: [`likeCounts`],
    queryFn: () => graphQLClient.request(getAllLikesCountQuery),
  });
  return { query, likes: query.data?.length };
};
