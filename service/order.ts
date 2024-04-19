import { Prisma, PrismaClient } from "@prisma/client";
import type { IOrderCreate } from "../interfaces/order";
import { OrderSchema } from "../schema/order";

const prismaClient = new PrismaClient();

export const CreateOrder = async (
  data: IOrderCreate
): Promise<Omit<Prisma.OrderDetailsCreateInput, "user">> => {
  const x = OrderSchema.CreateOrder.safeParse(data);

  if (!x.success) {
    const error = JSON.parse(x.error.message);
    throw new Error();
  }

  const createdOrder = await prismaClient.orderDetails.create({
    data: {
      ...data,
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

export const FindByOrderId = async (orderId: string) => {
  const order = await prismaClient.orderDetails.findFirst({
    where: {
      orderId: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};
