import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query ($email: String) {
    getUser(email: $email) {
      id
      name
      email
      profile
      bio
      joinedNGO {
        id
        name
        profile
      }
    }
  }
`;
