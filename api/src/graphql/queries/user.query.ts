import { getUser } from '@/models/user.model';
import { GraphQLError, GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLUserDataType } from '../typedefs/user.typedef';

export const GetUserQuery: GraphQLDefaultFieldConfig = {
  type: GraphQLUserDataType,
  args: {
    email: { type: GraphQLString },
  },
  resolve(_, requestArgs) {
    if (!requestArgs?.email) {
      throw new GraphQLError('Email is not provided.');
    }

    return getUser(requestArgs?.email);
  },
};
