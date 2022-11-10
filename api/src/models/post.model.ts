import { prismaClient } from './prisma';
import { CreatePostArgs } from '@/types/post.type';

export const createPost = (data: CreatePostArgs) => {
  return new Promise((resolve, reject) => {
    prismaClient.post
      .create({
        data,
      })
      .then(resolve)
      .catch(reject);
  });
};

// TODO: add authentication
export const deletePost = (postId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.post
      .delete({
        where: {
          id: postId,
        },
      })
      .then(resolve)
      .catch(reject);
  });
};
