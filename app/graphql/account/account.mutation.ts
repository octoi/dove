import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation ($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
      name
      profile
      bio
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
      bio
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation (
    $name: String
    $email: String
    $password: String
    $profile: String
    $bio: String
  ) {
    updateUser(
      name: $name
      email: $email
      password: $password
      profile: $profile
      bio: $bio
    ) {
      id
      email
      name
      profile
      bio
      token
    }
  }
`;
