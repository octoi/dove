import { GraphQLObjectType } from 'graphql';
import { GetNgoDetailsQuery } from './ngo.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    getNgoDetails: GetNgoDetailsQuery,
  }),
});
