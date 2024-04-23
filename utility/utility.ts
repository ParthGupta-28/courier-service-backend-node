import { customAlphabet } from "nanoid";
import type { IUserCreate, IUserFrontend } from "../interfaces/user";

export const MapUserToRes = (data: IUserCreate) => {
  const { address, city, email, name, phoneNo, pincode, state } = data;
  return {
    email,
    senderName: name,
    senderPhoneNo: phoneNo,
    senderState: state,
    senderCity: city,
    senderAddress: address,
    senderPincode: pincode,
  };
};

export const IUserUpdateToCreate = (data: IUserFrontend): IUserCreate => {
  return {
    email: data.email,
    password: data.password,
    name: data.senderName,
    phoneNo: data.senderPhoneNo,
    state: data.senderState,
    city: data.senderCity,
    address: data.senderAddress,
    pincode: data.senderPincode,
  };
};

export const nanoid = customAlphabet(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  8
);
