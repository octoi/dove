import { GraphQLInt, GraphQLString } from 'graphql';
import { getUserFromContext } from '@/utils/jwt';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { GraphQLNgoType } from '../typedefs/ngo.typedef';
import { validateCreateNgoArgs } from '../validators/ngo.validator';
import {
  createNgoController,
  deleteNgoController,
  dismissNgoAdminController,
  joinNgoController,
  makeNgoAdminController,
  removeMemberController,
  updateNgoController,
} from '@/controllers/ngo.controller';
import { removeMember } from '@/models/ngo.model';

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

export const JoinNgoMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    ngoId: { type: GraphQLString },
  },
  resolve(_, requestArgs, context) {
    const user: any = getUserFromContext(context);
    return joinNgoController(user?.id, requestArgs?.ngoId);
  },
};

export const MakeNgoAdminMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    ngoId: { type: GraphQLString },
    userId: { type: GraphQLInt },
  },
  resolve(_, requestArgs, context) {
    const user: any = getUserFromContext(context);
    return makeNgoAdminController(
      user?.id,
      requestArgs?.userId,
      requestArgs?.ngoId
    );
  },
};

export const DismissNgoAdminMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    ngoId: { type: GraphQLString },
    userId: { type: GraphQLInt },
  },
  resolve(_, requestArgs, context) {
    const user: any = getUserFromContext(context);
    return dismissNgoAdminController(
      user?.id,
      requestArgs?.userId,
      requestArgs?.ngoId
    );
  },
};

export const RemoveMemberMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    ngoId: { type: GraphQLString },
    userId: { type: GraphQLInt },
  },
  resolve(_, requestArgs, context) {
    const user: any = getUserFromContext(context);
    return removeMemberController(
      user?.id,
      requestArgs?.userId,
      requestArgs?.ngoId
    );
  },
};

export const LeaveNgoMutation: GraphQLDefaultFieldConfig = {
  type: GraphQLNgoType,
  args: {
    ngoId: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    const user: any = getUserFromContext(context);
    return await removeMember(requestArgs?.ngoId, user?.id);
  },
};
