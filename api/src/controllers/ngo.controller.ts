import { createNGO } from '@/models/ngo.model';
import { CreateNGOArgs } from '@/types/ngo.type';
import { GraphQLError } from 'graphql';

export const createNgoController = async (
  userId: number,
  data: CreateNGOArgs
) => {
  return await createNGO(userId, data).catch(() => {
    throw new GraphQLError('Failed to create NGO');
  });
};
