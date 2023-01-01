import { loadPostComments } from '@/models/comment.model';
import { GraphQLError, GraphQLInt, GraphQLList } from 'graphql';
import { GraphQLCommentType } from '../typedefs/comment.typedef';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';

export const GetPostCommentsQuery: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(GraphQLCommentType),
  args: {
    postId: { type: GraphQLInt },
  },
  async resolve(_, requestArgs) {
    if (!requestArgs?.postId) {
      throw new GraphQLError('Post ID is not provided');
    }

    return await loadPostComments(requestArgs?.postId).catch((err) => {
      throw new GraphQLError(err);
    });
  },
};
