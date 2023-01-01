import { getPostController } from '@/controllers/post.controller';
import { GraphQLError, GraphQLInt } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLPostType } from '../typedefs/post.typedef';

export const GetPostQuery: GraphQLDefaultFieldConfig = {
  type: GraphQLPostType,
  args: {
    postId: { type: GraphQLInt },
  },
  resolve(_, requestArgs) {
    if (!requestArgs?.postId) {
      throw new GraphQLError('Post ID is not provided');
    }

    return getPostController(requestArgs.postId);
  },
};
