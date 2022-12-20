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

export const GET_NGO_MEMBERS = gql`
  query ($ngoId: String) {
    getNgoDetails(ngoId: $ngoId) {
      members {
        id
        name
        email
        profile
      }
    }
  }
`;

export const GET_NGO_ADMINS = gql`
  query ($ngoId: String) {
    getNgoDetails(ngoId: $ngoId) {
      admins {
        id
        name
        email
        profile
      }
    }
  }
`;
