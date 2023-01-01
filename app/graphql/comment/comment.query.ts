import { gql } from '@apollo/client';

export const GET_POST_COMMENTS = gql`
  query ($postId: Int) {
    getPostComments(postId: $postId) {
      id
      comment
      createdAt
      user {
        id
        name
        email
        profile
      }
    }
  }
`;
