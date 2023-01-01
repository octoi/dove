import { ValidatorMessage } from '@/utils/constants';
import { getUserFromContext } from '@/utils/jwt';
import { GraphQLError, GraphQLInt, GraphQLString } from 'graphql';
import { GraphQLCommentType } from '../typedefs/comment.typedef';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import {
  createCommentController,
  deleteCommentController,
} from '@/controllers/comment.controller';

export const CreateCommentMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLCommentType,
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLInt },
  },
  resolve(_, requestArgs, context) {
    if (!requestArgs?.postId || !requestArgs?.comment) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    return createCommentController(user?.id, requestArgs);
  },
};

export const DeleteCommentMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLCommentType,
  args: {
    commentId: { type: GraphQLInt },
  },
  resolve(_, requestArgs) {
    if (!requestArgs?.commentId) {
      throw new GraphQLError(ValidatorMessage);
    }

    return deleteCommentController(requestArgs?.commentId);
  },
};
