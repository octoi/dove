import { prismaClient } from './prisma';
import { CreateCommentArgs } from '@/types/comment.type';

export const createComment = (data: CreateCommentArgs) => {
  return new Promise((resolve, reject) => {
    prismaClient.comment
      .create({
        data: data,
      })
      .then(resolve)
      .catch(reject);
  });
};

export const deleteComment = (commentId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.comment
      .delete({
        where: {
          id: commentId,
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

export const loadPostComments = (postId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.comment
      .findMany({
        where: {
          postId,
        },
        include: {
          _count: true,
          user: true,
          replies: true,
        },
      })
      .then(resolve)
      .catch(reject);
  });
};
