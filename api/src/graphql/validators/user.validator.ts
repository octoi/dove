import { UserLoginArgs, UserRegisterArgs } from '@/types/user.type';
import { ValidatorMessage } from '@/utils/constants';
import { GraphQLError } from 'graphql';

export const validateRegisterArgs = (
  args: UserRegisterArgs
): UserRegisterArgs => {
  if (!args.email || !args.name || !args.password || !args.profile) {
    throw new GraphQLError(ValidatorMessage);
  }

  return args;
};

export const validateLoginArgs = (args: UserLoginArgs): UserLoginArgs => {
  if (!args.email || !args.password) {
    throw new GraphQLError(ValidatorMessage);
  }

  return args;
};
