import { GraphQLString } from 'graphql';
import { getUserFromContext } from '@/utils/jwt';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLNgoType } from '../typedefs/ngo.typedef';
import { validateCreateNgoArgs } from '../validators/ngo.validator';
import {
  createNgoController,
  deleteNgoController,
  updateNgoController,
} from '@/controllers/ngo.controller';

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

export const UpdateNgoMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    ngoId: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    profile: { type: GraphQLString },
    banner: { type: GraphQLString },
  },
  resolve(_, requestArgs, context) {
    const user: any = getUserFromContext(context);

    const ngoId = requestArgs?.ngoId;
    delete requestArgs?.ngoId; // deleting ngoId from data, by passing with ngoId, prisma will throw error

    return updateNgoController(user?.id, ngoId, requestArgs);
  },
};

export const DeleteNgoMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    ngoId: { type: GraphQLString },
  },
  resolve(_, requestArgs, context) {
    const user: any = getUserFromContext(context);
    return deleteNgoController(user?.id, requestArgs?.ngoId);
  },
};
