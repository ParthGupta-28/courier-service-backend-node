import { Prisma } from "@prisma/client";

export type IUserCreate = Prisma.UserDetailsCreateInput;

export type IUserLogin = Pick<
  Prisma.UserDetailsCreateInput,
  "password" | "email"
>;

export type IUserUpdate = IUserCreate & {
  newPassword: string;
};

export type IUserFrontend = {
  email: string;
  senderName: string;
  senderPhoneNo: string;
  senderPincode: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  oldPassword: string;
  password: string;
};
