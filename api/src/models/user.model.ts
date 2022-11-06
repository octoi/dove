import bcrypt from 'bcrypt';
import { prismaClient } from './prisma';
import { UserRegisterArgs } from '@/types/user.type';

export const registerUser = (data: UserRegisterArgs) => {
  return new Promise(async (resolve, reject) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    prismaClient.user
      .create({
        data: {
          ...data,
          password: hashedPassword,
        },
      })
      .then(resolve)
      .catch((err: { code: String }) => {
        /* 
          https://www.prisma.io/docs/reference/api-reference/error-reference
          error `P2002` = "Unique constraint failed on the {constraint}" 
          user is trying to signup with and email which is already exits
        */
        if (err.code === 'P2002') {
          reject(`${data.email} already exist`);
        }
        reject('Failed to register user');
      });
  });
};
