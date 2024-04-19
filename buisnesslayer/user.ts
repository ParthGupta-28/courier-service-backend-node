import type {
  IUserCreate,
  IUserFrontend,
  IUserLogin,
  IUserUpdate,
} from "../interfaces/user";
import { CreateUser, FindUser, UpdateUser } from "../service/user";
import { IUserUpdateToCreate } from "../utility/utility";

export const CreateUserBL = async (data: IUserCreate) => {
  const isUser = await FindUser(data.email).catch((err) => {
    throw new Error(err);
  });

  if (isUser) {
    throw new Error("User already exists");
  }

  const newUser = await CreateUser(data).catch((err) => {
    throw new Error(err);
  });

  return newUser;
};

export const LoginUserBL = async (data: IUserLogin) => {
  const user = await FindUser(data.email);

  if (!user) {
    throw new Error("User does not exist");
  }
  if (user.password !== data.password) {
    throw new Error("Incorrect password");
  }
  return user;
};

export const UpdateUserBL = async (data: IUserFrontend) => {
  const user = await FindUser(data.email).catch((err) => {
    throw new Error(err);
  });

  console.log(data);
  console.log(user);

  if (!user) {
    throw new Error("User does not exist");
  }

  if (data.oldPassword !== user.password) {
    throw new Error("Incorrect password");
  }

  const updateUser = IUserUpdateToCreate(data);

  console.log(updateUser);

  const updatedUser = await UpdateUser(updateUser).catch((err) => {
    throw new Error(err);
  });

  return updatedUser;
};
