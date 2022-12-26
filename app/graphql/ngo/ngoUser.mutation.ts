import { gql } from '@apollo/client';

export const MAKE_USER_ADMIN = gql`
  mutation ($ngoId: String, $userId: Int) {
    makeNgoAdmin(ngoId: $ngoId, userId: $userId) {
      id
    }
  }
`;

export const DISMISS_USER_ADMIN = gql`
  mutation ($ngoId: String, $userId: Int) {
    dismissNgoAdmin(ngoId: $ngoId, userId: $userId) {
      id
    }
  }
`;
