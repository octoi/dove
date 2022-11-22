import { GraphQLString } from 'graphql';
import { getUserFromContext } from '@/utils/jwt';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLUserType } from '../typedefs/user.typedef';
import {
  validateLoginArgs,
  validateRegisterArgs,
} from '../validators/user.validator';
import {
  loginController,
  updateController,
  registerController,
} from '@/controllers/user.controller';

export const LoginMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLUserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(_, requestArgs) {
    const args = validateLoginArgs(requestArgs);
    return loginController(args);
  },
};

export const RegisterMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLUserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(_, requestArgs) {
    const args = validateRegisterArgs(requestArgs);
    return registerController(args);
  },
};

export const UpdateMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLUserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
    bio: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(_, requestArgs, context) {
    const user: any = getUserFromContext(context);
    return updateController(user?.id, requestArgs);
  },
};
