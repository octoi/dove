import { createLike, deleteLike } from '@/models/like.model';

export const createLikeController = async (userId: number, postId: number) => {
  return await createLike(userId, postId);
};

export const deleteLikeController = async (userId: number, postId: number) => {
  return await deleteLike(userId, postId);
};
