import { prismaClient } from './prisma';
import { CreatePostArgs } from '@/types/post.type';
import { getUserNGOs } from './user.model';

export const createPost = (data: CreatePostArgs) => {
  return new Promise((resolve, reject) => {
    prismaClient.post
      .create({
        data,
      })
      .then(resolve)
      .catch(() => reject('Failed to create post'));
  });
};

export const deletePost = (postId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.post
      .delete({
        where: {
          id: postId,
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to delete post'));
  });
};

// Get user NGOs and load posts from that NGOs
export const loadUserFeed = (userId: number, page: number) => {
  return new Promise((resolve, reject) => {
    getUserNGOs(userId).then((userData: any) => {
      if (!userData.joinedNGO) {
        reject('User does not have any joined NGOS');
        return;
      }

      let skip = (page - 1) * 10;

      prismaClient.post
        .findMany({
          where: {
            ngo: {
              OR: userData?.joinedNGO,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            _count: true,
            ngo: true,
            // selecting like by user
            Like: {
              where: {
                userId,
              },
            },
          },
          skip,
          take: 10,
        })
        .then(resolve)
        .catch(() => reject('Failed to load user feed'));
    });
  });
};

export const getPost = (postId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.post
      .findUnique({
        where: {
          id: postId,
        },
        include: {
          _count: true,
          Comment: true,
          Like: true,
          ngo: true,
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to get post'));
  });
};
