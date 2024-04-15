import { PrismaClient } from "@prisma/client";
import type { IUserCreate, IUserLogin } from "../interfaces/user";

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
};

export const LoginUser = async (data: IUserLogin) => {
  const user = await prismaClient.userDetails.findFirst({
    where: {
      email: data.email,
      password: data.password,
    },
  });
  if (!user) {
    throw new Error("User does not exist");
  }
  return user;
};
