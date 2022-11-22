import { GraphQLError } from 'graphql';
import { registerUser, loginUser, updateUser } from '@/models/user.model';
import { generateToken } from '@/utils/jwt';
import {
  UserLoginArgs,
  UserRegisterArgs,
  UserUpdateArgs,
} from '@/types/user.type';

export const registerController = async (data: UserRegisterArgs) => {
  const user: any = await registerUser(data).catch((err) => {
    throw new GraphQLError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const loginController = async (data: UserLoginArgs) => {
  const user: any = await loginUser(data).catch((err) => {
    throw new GraphQLError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const updateController = async (
  userId: number,
  data: UserUpdateArgs
) => {
  const user: any = await updateUser(data, userId).catch((err) => {
    throw new GraphQLError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};
