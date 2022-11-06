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

// find user with email or userId
export const findUser = ({
  email,
  userId,
}: {
  email?: string;
  userId?: number;
}) => {
  return new Promise((resolve, reject) => {
    if (!(email || userId)) reject('Email or user id is not provided'); // quit function if `email` or `userId` is not provided

    let whereData = email ? { email } : { id: userId }; // if email exist find with `email` else find with `id`

    prismaClient.user
      .findUnique({
        where: whereData,
        include: {
          _count: {
            select: {
              joinedNGO: true,
            },
          },
        },
      })
      .then((user: any) => {
        if (!user) {
          reject(`Failed to find user with email ${email}`);
          return;
        }
        resolve(user);
      })
      .catch(() => {
        reject(`Failed to find user with email ${email}`);
      });
  });
};
