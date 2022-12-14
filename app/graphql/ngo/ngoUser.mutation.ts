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

export const REMOVE_MEMBER = gql`
  mutation ($ngoId: String, $userId: Int) {
    removeMember(ngoId: $ngoId, userId: $userId) {
      id
    }
  }
`;

export const JOIN_NGO = gql`
  mutation ($ngoId: String) {
    joinNgo(ngoId: $ngoId) {
      id
    }
  }
`;

export const LEAVE_NGO = gql`
  mutation ($ngoId: String) {
    leaveNgo(ngoId: $ngoId) {
      id
    }
  }
`;
