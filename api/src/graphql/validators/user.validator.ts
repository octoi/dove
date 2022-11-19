import { UserLoginArgs, UserRegisterArgs } from '@/types/user.type';
import { GraphQLError } from 'graphql';

const MESSAGE = 'required fields not found';

export const validateRegisterArgs = (
  args: UserRegisterArgs
): UserRegisterArgs => {
  if (!args.email || !args.name || !args.password || !args.profile) {
    throw new GraphQLError(MESSAGE);
  }

  return args;
};

export const validateLoginArgs = (args: UserLoginArgs): UserLoginArgs => {
  if (!args.email || !args.password) {
    throw new GraphQLError(MESSAGE);
  }

  return args;
};
