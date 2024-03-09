// import { graphql } from "@/gql";

// export const createTweetMutation = graphql(`
//   #graphql
//   mutation CreateTweet($createTweetPayload: CreateTweetInput!) {
//     createTweet($payload: $createTweetPayload) {
//       id
//     }
//   }
// `);
import { graphql } from "@/gql";

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetInput!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);