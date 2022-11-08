import { prismaClient } from './prisma';
import { CreateNGOArgs } from '@/types/ngo.type';

// create new NGO
// takes NGO data & userId of creator
export const createNGO = (data: CreateNGOArgs, userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .create({
        data: {
          ...data,
          creatorId: userId,
        },
      })
      .then(resolve)
      .catch(reject);
  });
};
