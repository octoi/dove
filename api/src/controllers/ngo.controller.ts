import { authenticateNGOAdmin, createNGO, updateNGO } from '@/models/ngo.model';
import { CreateNGOArgs, UpdateNGOArgs } from '@/types/ngo.type';
import { GraphQLError } from 'graphql';

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
