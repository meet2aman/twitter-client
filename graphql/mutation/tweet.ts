import { graphql } from "@/gql";
import TwitterLottie from "@/lib/TwitterLottie";

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetInput!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);

export const getSignedURLForTweetQuery = graphql(`
  #graphql
  query GetSignedURL($imageName: String!, $imageType: String!) {
    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
  }
`);
