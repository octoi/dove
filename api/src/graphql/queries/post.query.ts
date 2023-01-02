import {
  getPostController,
  loadNgoPostsController,
} from '@/controllers/post.controller';
import { ValidatorMessage } from '@/utils/constants';
import { getUserFromContext } from '@/utils/jwt';
import { GraphQLError, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLPostType } from '../typedefs/post.typedef';

export const GetPostQuery: GraphQLDefaultFieldConfig = {
  type: GraphQLPostType,
  args: {
    postId: { type: GraphQLInt },
  },
  resolve(_, requestArgs, context) {
    if (!requestArgs?.postId) {
      throw new GraphQLError('Post ID is not provided');
    }

    let user: any = { id: null };
    if (
      context.req.headers.authorization &&
      context.req.headers.authorization.length > 6
    ) {
      user = getUserFromContext(context);
    }

    return getPostController(requestArgs.postId, user?.id);
  },
};

export const LoadNgoPostsQuery: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(GraphQLPostType),
  args: {
    ngoId: { type: GraphQLString },
  },
  resolve(_, requestArgs, context) {
    if (!requestArgs?.ngoId) {
      throw new GraphQLError('Ngo Id is not provided.');
    }

    let user: any = { id: null };
    if (
      context.req.headers.authorization &&
      context.req.headers.authorization.length > 6
    ) {
      user = getUserFromContext(context);
    }

    return loadNgoPostsController(requestArgs.ngoId, user?.id);
  },
};
