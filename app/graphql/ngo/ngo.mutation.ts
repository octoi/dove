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
