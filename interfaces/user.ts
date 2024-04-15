import { Prisma } from "@prisma/client";

export type IUserCreate = Prisma.UserDetailsCreateInput;

export type IUserLogin = Pick<
  Prisma.UserDetailsCreateInput,
  "password" | "email"
>;
