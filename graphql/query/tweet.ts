import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
  #graphql

  query GetAllTweets {
    getAllTweets {
      id
      content
      tweetImageUrl
      author {
        email
        id
        firstName
        lastName
        profileImage
      }
    }
  }
`);
