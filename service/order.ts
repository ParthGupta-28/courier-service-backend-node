import { Prisma, PrismaClient } from "@prisma/client";
import type { IOrderCreate } from "../interfaces/order";
import { customAlphabet } from "nanoid";

const prismaClient = new PrismaClient();
const nanoid = customAlphabet(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  8
);

export const CreateOrder = async (
  data: IOrderCreate
): Promise<Omit<Prisma.OrderDetailsCreateInput, "user">> => {
  const status = "Pending";
  const orderId = nanoid();

  const order = await prismaClient.orderDetails.findFirst({
    where: {
      orderId: orderId,
    },
  });

  if (order) {
    return await CreateOrder(data);
  }
  const createdOrder = await prismaClient.orderDetails.create({
    data: {
      ...data,
      orderId,
      status,
    },
  });

  return createdOrder;
};

export const GetAllOrders = async (email: string) => {
  const orders = await prismaClient.orderDetails.findMany({
    where: {
      user: {
        email: email,
      },
    },
  });
  return orders;
};
