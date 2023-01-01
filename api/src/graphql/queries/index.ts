import { GraphQLObjectType } from 'graphql';
import { GetNgoDetailsQuery } from './ngo.query';
import { GetPostQuery } from './post.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    getNgoDetails: GetNgoDetailsQuery,
    // post query
    getPost: GetPostQuery,
  }),
});
