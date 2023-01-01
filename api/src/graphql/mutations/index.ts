import { GraphQLObjectType } from 'graphql';
import { CreatePostMutation, DeletePostMutation } from './post.mutation';
import { CreateLikeMutation, DeleteLikeMutation } from './like.mutation';
import {
  LoginMutation,
  RegisterMutation,
  UpdateMutation,
} from './user.mutation';
import {
  CreateNgoMutation,
  DeleteNgoMutation,
  DismissNgoAdminMutation,
  JoinNgoMutation,
  LeaveNgoMutation,
  MakeNgoAdminMutation,
  RemoveMemberMutation,
  UpdateNgoMutation,
} from './ngo.mutation';
import {
  CreateCommentMutation,
  DeleteCommentMutation,
} from './comment.mutation';

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
    makeNgoAdmin: MakeNgoAdminMutation,
    dismissNgoAdmin: DismissNgoAdminMutation,
    removeMember: RemoveMemberMutation,
    leaveNgo: LeaveNgoMutation,
    // post operations
    createPost: CreatePostMutation,
    deletePost: DeletePostMutation,
    // like operations
    createLike: CreateLikeMutation,
    deleteLike: DeleteLikeMutation,
    // comment operations
    createComment: CreateCommentMutation,
    deleteComment: DeleteCommentMutation,
  }),
});
