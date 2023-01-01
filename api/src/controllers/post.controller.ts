import { authenticateNGOAdmin } from '@/models/ngo.model';
import { createPost, deletePost, getPost } from '@/models/post.model';
import { CreatePostArgs } from '@/types/post.type';
import { GraphQLError } from 'graphql';

export const createPostController = async (
  userId: number,
  data: CreatePostArgs
) => {
  let authentication = await authenticateNGOAdmin(userId, data.ngoId).catch(
    (err) => {
      throw new GraphQLError(err);
    }
  );

  if (!authentication) {
    throw new GraphQLError('Permission denied');
  }

  return await createPost(data).catch((err) => {
    throw new GraphQLError(err);
  });
};

export const getPostController = async (postId: number) => {
  return await getPost(postId).catch((err) => {
    throw new GraphQLError(err);
  });
};

export const deletePostController = async (
  userId: number,
  ngoId: string,
  postId: number
) => {
  let authentication = await authenticateNGOAdmin(userId, ngoId).catch(
    (err) => {
      throw new GraphQLError(err);
    }
  );

  if (!authentication) {
    throw new GraphQLError('Permission denied');
  }

  return await deletePost(postId).catch((err) => {
    throw new GraphQLError(err);
  });
};
