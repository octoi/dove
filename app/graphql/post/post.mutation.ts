import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation ($ngoId: String, $text: String, $media: String) {
    createPost(ngoId: $ngoId, text: $text, media: $media) {
      id
      text
      media
    }
  }
`;
