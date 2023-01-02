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
      Like {
        userId
      }
      _count {
        Like
        Comment
      }
    }
  }
`;

export const LOAD_NGO_POSTS = gql`
  query ($ngoId: String) {
    loadNgoPosts(ngoId: $ngoId) {
      id
      text
      media
      createdAt
      Like {
        userId
      }
      _count {
        Like
        Comment
      }
    }
  }
`;
