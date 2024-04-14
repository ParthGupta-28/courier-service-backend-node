import { z } from "zod";

export type user = {
  email: string;
  password: string;
  phoneNo: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
};

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
