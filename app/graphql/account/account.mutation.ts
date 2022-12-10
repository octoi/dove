import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation ($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
      name
      profile
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation (
    $name: String
    $email: String
    $password: String
    $profile: String
  ) {
    register(
      name: $name
      email: $email
      password: $password
      profile: $profile
    ) {
      id
      email
      name
      profile
      token
    }
  }
`;
