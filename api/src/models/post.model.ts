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
