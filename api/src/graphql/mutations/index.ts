import { GraphQLObjectType } from 'graphql';
import {
  LoginMutation,
  RegisterMutation,
  UpdateMutation,
} from './user.mutation';
import {
  CreateNgoMutation,
  DeleteNgoMutation,
  JoinNgoMutation,
  UpdateNgoMutation,
} from './ngo.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    login: LoginMutation,
    register: RegisterMutation,
    updateUser: UpdateMutation,
    // ngo operations
    createNgo: CreateNgoMutation,
    updateNgo: UpdateNgoMutation,
    deleteNgo: DeleteNgoMutation,
    // ngo user operations
    joinNgo: JoinNgoMutation,
  }),
});
