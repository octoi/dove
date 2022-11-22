import { createNgoController } from '@/controllers/ngo.controller';
import { getUserFromContext } from '@/utils/jwt';
import { GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLNgoType } from '../typedefs/ngo.typedef';
import { validateCreateNgoArgs } from '../validators/ngo.validator';

export const CreateNgoMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    profile: { type: GraphQLString },
    banner: { type: GraphQLString },
  },
  resolve(_, requestArgs, context) {
    const args = validateCreateNgoArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return createNgoController(user?.id, args);
  },
};
