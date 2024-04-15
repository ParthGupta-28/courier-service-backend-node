import { z } from "zod";

const CreateUser = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phoneNo: z.string().min(10),
  state: z.string(),
  city: z.string(),
  pincode: z.string().length(6),
  address: z.string(),
});

const LoginUser = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UserSchema = {
  CreateUser,
  LoginUser,
};
