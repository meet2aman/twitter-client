import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImage
      firstName
      lastName
      email
      tweets {
        id
        content
        tweetImageUrl
        author {
          id
          firstName
          lastName
          profileImage
          email
        }
      }
    }
  }
`);

export const getUserByIdQuery = graphql(`
  #graphql

  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      profileImage
      email
      tweets {
        id
        content
        tweetImageUrl
        author {
          id
          firstName
          lastName
          profileImage
        }
      }
    }
  }
`);
