import { prismaClient } from './prisma';

export const createLike = (userId: number, postId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.like
      .create({
        data: {
          userId,
          postId,
        },
      })
      .then(resolve)
      .catch((err: { code: string }) => {
        /* 
          https://www.prisma.io/docs/reference/api-reference/error-reference
          error `P2002` = "Unique constraint failed on the {constraint}" 
          user is trying to like same post
        */

        if (err.code === 'P2002') {
          // simply exiting because we don't need to handle this situation
          return;
        }

        reject('Failed to like post');
      });
  });
};

export const deleteLike = (userId: number, postId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.like
      .delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      })
      .then(resolve)
      .catch((err: { code: string }) => {
        // check if record does not exist
        if (err.code === 'P2025') {
          return;
        }

        reject('Failed to remove like');
      });
  });
};
