import { getUserFromContext } from '@/utils/jwt';
import { GraphQLInt, GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLPostType } from '../typedefs/post.typedef';
import {
  createPostController,
  deletePostController,
} from '@/controllers/post.controller';
import {
  validateCreatePostArgs,
  validateDeletePostArgs,
} from '../validators/post.validator';

export const CreatePostMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLPostType,
  args: {
    ngoId: { type: GraphQLString },
    text: { type: GraphQLString },
    media: { type: GraphQLString },
  },
  resolve(_, requestArgs, context) {
    const args = validateCreatePostArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return createPostController(user?.id, args);
  },
};

export const DeletePostMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLPostType,
  args: {
    ngoId: { type: GraphQLString },
    postId: { type: GraphQLInt },
  },
  resolve(_, requestArgs, context) {
    const args = validateDeletePostArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return deletePostController(user?.id, args.ngoId, args.postId);
  },
};
