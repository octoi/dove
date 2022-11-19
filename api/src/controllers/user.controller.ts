import { GraphQLError } from 'graphql';
import { registerUser, loginUser } from '@/models/user.model';
import { UserLoginArgs, UserRegisterArgs } from '@/types/user.type';

export const registerController = async (data: UserRegisterArgs) => {
  const user: any = await registerUser(data).catch((err) => {
    throw new GraphQLError(err?.message, {
      extensions: {
        code: 'UserInputError',
      },
    });
  });

  return user;
};

export const loginController = async (data: UserLoginArgs) => {
  const user: any = await loginUser(data).catch((err) => {
    throw new GraphQLError(err?.message, {
      extensions: {
        code: 'UserInputError',
      },
    });
  });

  return user;
};
