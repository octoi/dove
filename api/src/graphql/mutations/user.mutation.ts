import { GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLUserType } from '../typedefs/user.typedef';
import { validateLoginArgs } from '../validators/user.validator';
import { loginController } from '@/controllers/user.controller';

export const LoginMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLUserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, requestArgs) {
    const args = validateLoginArgs(requestArgs);
    return loginController(args);
  },
};
