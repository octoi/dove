import { gql } from '@apollo/client';

export const GET_NGO_DETAILS = gql`
  query ($ngoId: String) {
    getNgoDetails(ngoId: $ngoId) {
      id
      name
      description
      profile
      banner
      creatorId
    }
  }
`;
