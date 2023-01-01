import { gql } from '@apollo/client';

export const CREATE_LIKE = gql`
  mutation ($postId: Int) {
    createLike(postId: $postId) {
      id
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation ($postId: Int) {
    deleteLike(postId: $postId) {
      id
    }
  }
`;
