import { GraphQLSchema } from 'graphql';
import { Queries } from './queries/index';
import { Mutations } from './mutations/index';

export const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});
