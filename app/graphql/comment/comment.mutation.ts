import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation ($comment: String, $postId: Int) {
    createComment(comment: $comment, postId: $postId) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation ($commentId: Int) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;
