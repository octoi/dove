import { prismaClient } from './prisma';
import { CreateNGOArgs, UpdateNGOArgs } from '@/types/ngo.type';

export const createNGO = (userId: number, data: CreateNGOArgs) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .create({
        data: {
          ...data,
          creatorId: userId,
          members: {
            connect: {
              id: userId,
            },
          },
          admins: {
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

export const loadNGO = (page: number) => {
  return new Promise((resolve, reject) => {
    let skip = (page - 1) * 10;

    prismaClient.ngo
      .findMany({
        skip,
        take: 10,
      })
      .then(resolve)
      .catch(reject);
  });
};

export const updateNGO = (ngoId: string, data: UpdateNGOArgs) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .update({
        where: {
          id: ngoId,
        },
        data,
      })
      .then(resolve)
      .catch(reject);
  });
};

export const deleteNGO = (ngoId: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .delete({
        where: {
          id: ngoId,
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

// get NGO details with joined members and admins
export const getNGODetails = (ngoId: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .findUnique({
        where: {
          id: ngoId,
        },
        select: {
          admins: true,
          members: true,
          _count: {
            select: {
              members: true,
            },
          },
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

// connect user to ngo admins
export const makeNGOAdmin = (ngoId: string, userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .update({
        where: {
          id: ngoId,
        },
        data: {
          admins: {
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

// disconnect user from admins
export const removeNGOAdmin = (ngoId: string, userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .update({
        where: {
          id: ngoId,
        },
        data: {
          admins: {
            disconnect: {
              id: userId,
            },
          },
        },
      })
      .then(resolve)
      .catch(reject);
  });
};

// disconnect member from members
export const removeMember = (ngoId: string, userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .update({
        where: {
          id: ngoId,
        },
        data: {
          members: {
            disconnect: {
              id: userId,
            },
          },
        },
      })
      .then(resolve)
      .catch(reject);
  });
};
