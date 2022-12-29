import { gql } from '@apollo/client';

export const CREATE_NGO = gql`
  mutation (
    $name: String
    $description: String
    $profile: String
    $banner: String
  ) {
    createNgo(
      name: $name
      description: $description
      profile: $profile
      banner: $banner
    ) {
      id
    }
  }
`;

export const UPDATE_NGO = gql`
  mutation (
    $ngoId: String
    $name: String
    $description: String
    $profile: String
    $banner: String
  ) {
    updateNgo(
      ngoId: $ngoId
      name: $name
      description: $description
      profile: $profile
      banner: $banner
    ) {
      id
    }
  }
`;

export const DELETE_NGO = gql`
  mutation ($ngoId: String) {
    deleteNgo(ngoId: $ngoId) {
      id
    }
  }
`;
