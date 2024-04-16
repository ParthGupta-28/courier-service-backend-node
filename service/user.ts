import { PrismaClient } from "@prisma/client";
import type { IUserCreate, IUserLogin, IUserUpdte } from "../interfaces/user";

const prismaClient = new PrismaClient();

export const CreateUser = async (data: IUserCreate) => {
  const user = await prismaClient.userDetails.findFirst({
    where: {
      email: data.email,
    },
  });
  if (user) {
    throw new Error("User already exists");
  }

  prismaClient.userDetails.create({
    data,
  });

  return data;
};

export const LoginUser = async (data: IUserLogin) => {
  const user = await prismaClient.userDetails.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new Error("User does not exist");
  }
  if (user.password !== data.password) {
    throw new Error("Incorrect password");
  }
  return user;
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

export const UpdateUser = async (data: IUserUpdte) => {
  const user = await prismaClient.userDetails.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  if (data.password !== user.password) {
    throw new Error("Incorrect password");
  }

  const updatedUser = await prismaClient.userDetails.update({
    where: {
      email: data.email,
    },
    data: {
      ...data,
      password: data.newPassword,
    },
  });

  return updatedUser;
};
