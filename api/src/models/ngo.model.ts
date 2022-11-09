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

// connect user with NGO
export const joinNGO = (ngoId: string, userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .update({
        where: {
          id: ngoId,
        },
        data: {
          members: {
            connect: {
              id: userId,
            },
          },
        },
      })
      .then(resolve)
      .catch(reject);
  });
};
