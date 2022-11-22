import { prismaClient } from './prisma';
import { CreateCommentArgs } from '@/types/comment.type';

export const createComment = (data: CreateCommentArgs) => {
  return new Promise((resolve, reject) => {
    prismaClient.comment
      .create({
        data: data,
      })
      .then(resolve)
      .catch(() => reject('Failed to create comment'));
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
      .catch(() => reject('Failed to delete comment'));
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
          user: true,
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to fetch comments'));
  });
};
