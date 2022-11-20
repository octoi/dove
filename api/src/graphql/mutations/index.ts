import { GraphQLObjectType } from 'graphql';
import { LoginMutation, RegisterMutation } from './user.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    login: LoginMutation,
    register: RegisterMutation,
  }),
});
