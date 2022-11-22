import { GraphQLObjectType } from 'graphql';
import { CreateNgoMutation } from './ngo.mutation';
import {
  LoginMutation,
  RegisterMutation,
  UpdateMutation,
} from './user.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    login: LoginMutation,
    register: RegisterMutation,
    updateUser: UpdateMutation,
    // ngo operations
    createNgo: CreateNgoMutation,
  }),
});
