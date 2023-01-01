import { GraphQLError } from 'graphql';
import { createComment, deleteComment } from '@/models/comment.model';
import { CreateCommentArgs } from '@/types/comment.type';

export const createCommentController = async (
  userId: number,
  data: CreateCommentArgs
) => {
  return await createComment({ ...data, userId }).catch((err) => {
    throw new GraphQLError(err);
  });
};

export const deleteCommentController = async (commentId: number) => {
  return await deleteComment(commentId).catch((err) => {
    throw new GraphQLError(err);
  });
};
