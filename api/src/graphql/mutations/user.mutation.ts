import { GraphQLString } from 'graphql';
import { loginController } from '@/controllers/user.controller';
import { registerController } from '@/controllers/user.controller';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLUserType } from '../typedefs/user.typedef';
import {
  validateLoginArgs,
  validateRegisterArgs,
} from '../validators/user.validator';

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
