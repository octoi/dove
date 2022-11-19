import { GraphQLObjectType } from 'graphql';
import { LoginMutation } from './user.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    login: LoginMutation,
  }),
});
