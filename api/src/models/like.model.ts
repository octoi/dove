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
      .catch(reject);
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
      .catch(reject);
  });
};
