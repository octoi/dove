import { gql } from '@apollo/client';

export const GET_POST = gql`
  query ($postId: Int) {
    getPost(postId: $postId) {
      id
      text
      media
      createdAt
      ngo {
        admins {
          id
        }
      }
    }
  }
`;
