import { GraphQLError } from 'graphql';
import { CreateNGOArgs, UpdateNGOArgs } from '@/types/ngo.type';
import {
  authenticateNGOAdmin,
  createNGO,
  deleteNGO,
  joinNGO,
  makeNGOAdmin,
  updateNGO,
  getNGODetails,
} from '@/models/ngo.model';

export const createNgoController = async (
  userId: number,
  data: CreateNGOArgs
) => {
  return await createNGO(userId, data).catch((err) => {
    throw new GraphQLError(err);
  });
};

export const updateNgoController = async (
  userId: number,
  ngoId: string,
  data: UpdateNGOArgs
) => {
  let authentication = await authenticateNGOAdmin(userId, ngoId).catch(
    (err) => {
      throw new GraphQLError(err);
    }
  );

  if (!authentication) {
    throw new GraphQLError('Permission denied');
  }

  return await updateNGO(ngoId, data).catch((err) => {
    throw new GraphQLError(err);
  });
};

export const deleteNgoController = async (userId: number, ngoId: string) => {
  let authentication = await authenticateNGOAdmin(userId, ngoId).catch(
    (err) => {
      throw new GraphQLError(err);
    }
  );

  if (!authentication) {
    throw new GraphQLError('Permission denied');
  }

  return await deleteNGO(ngoId).catch((err) => {
    throw new GraphQLError(err);
  });
};

export const joinNgoController = async (userId: number, ngoId: string) => {
  return await joinNGO(ngoId, userId).catch((err) => {
    throw new GraphQLError(err);
  });
};

export const makeNgoAdminController = async (
  requestUserId: number,
  targetUserId: number,
  ngoId: string
) => {
  let authentication = await authenticateNGOAdmin(requestUserId, ngoId).catch(
    (err) => {
      throw new GraphQLError(err);
    }
  );

  if (!authentication) {
    throw new GraphQLError('Permission denied');
  }

  return await makeNGOAdmin(ngoId, targetUserId);
};

export const getNgoController = async (ngoId: string) => {
  return await getNGODetails(ngoId).catch((err) => {
    throw new GraphQLError(err);
  });
};
