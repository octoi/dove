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
      .catch(() => reject('Failed to create ngo'));
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
      .catch(() => reject('Failed to load NGOs'));
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
      .catch(() => reject('Failed to update ngo'));
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
      .catch(() => reject('Failed to delete ngo'));
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
        include: {
          _count: true,
          admins: true,
          members: true,
        },
      })
      .then(resolve)
      .catch(() => reject('Failed to get ngo details'));
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
      .catch(() => reject('Failed to join ngo'));
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
      .catch(() => reject('Failed to assign admin role'));
  });
};

// disconnect user from admins
export const dismissNGOAdmin = (ngoId: string, userId: number) => {
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
      .catch(() => reject('Failed to remove admin'));
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
      .catch(() => reject('Failed to remove member'));
  });
};

// returns ngo details if provided user is admin of give NGO
export const authenticateNGOAdmin = (userId: number, ngoId: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.ngo
      .findFirst({
        where: {
          id: ngoId,
          admins: {
            some: {
              id: userId,
            },
          },
        },
      })
      .then(resolve)
      .catch(() => reject('Authentication failed'));
  });
};
