import { ValidatorMessage } from '@/utils/constants';
import { getUserFromContext } from '@/utils/jwt';
import { GraphQLError, GraphQLInt } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLLikeType } from '../typedefs/like.typedef';
import {
  createLikeController,
  deleteLikeController,
} from '@/controllers/like.controller';

export const CreateLikeMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLLikeType,
  args: {
    postId: { type: GraphQLInt },
  },
  resolve(_, requestArgs, context) {
    if (!requestArgs?.postId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    return createLikeController(user?.id, requestArgs?.postId);
  },
};

export const DeleteLikeMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLLikeType,
  args: {
    postId: { type: GraphQLInt },
  },
  resolve(_, requestArgs, context) {
    if (!requestArgs?.postId) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user: any = getUserFromContext(context);
    return deleteLikeController(user?.id, requestArgs?.postId);
  },
};
