import { CreatePostArgs } from '@/types/post.type';
import { ValidatorMessage } from '@/utils/constants';
import { GraphQLError } from 'graphql';

export const validateCreatePostArgs = (args: CreatePostArgs) => {
  if (!args.text || !args.ngoId) {
    throw new GraphQLError(ValidatorMessage);
  }

  return args;
};

export const validateDeletePostArgs = (args: {
  ngoId: string;
  postId: number;
}) => {
  if (!args.ngoId || !args.postId) {
    throw new GraphQLError(ValidatorMessage);
  }

  return args;
};
