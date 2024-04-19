import { PrismaClient } from "@prisma/client";
import type { IUserCreate, IUserLogin, IUserUpdate } from "../interfaces/user";

const prismaClient = new PrismaClient();

export const CreateUser = async (data: IUserCreate) => {
  const newUser = await prismaClient.userDetails
    .create({
      data,
    })
    .catch((err) => {
      throw new Error(err);
    });

  return newUser;
};

export const FindUser = async (email: string) => {
  const user = await prismaClient.userDetails.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User does not exist");
  }
  return user;
};

export const UpdateUser = async (data: IUserCreate) => {
  const updatedUser = await prismaClient.userDetails
    .update({
      where: {
        email: data.email,
      },
      data: {
        ...data,
      },
    })
    .catch((err) => {
      throw new Error(err);
    });

  return updatedUser;
};
