import { CreateNGOArgs } from '@/types/ngo.type';
import { ValidatorMessage } from '@/utils/constants';
import { GraphQLError } from 'graphql';

export const validateCreateNgoArgs = (args: CreateNGOArgs) => {
  if (!args.name || !args.description || !args.banner || !args.profile) {
    throw new GraphQLError(ValidatorMessage);
  }

  return args;
};
