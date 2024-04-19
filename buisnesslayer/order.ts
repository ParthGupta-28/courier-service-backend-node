import type { Prisma } from "@prisma/client";
import { nanoid } from "../utility/utility";
import type { IOrderBL, IOrderCreate } from "../interfaces/order";
import { CreateOrder, FindByOrderId } from "../service/order";

export const CreateOrderBL = async (
  data: IOrderBL
): Promise<Omit<Prisma.OrderDetailsCreateInput, "user">> => {
  const status = "Pending";
  const currentLocation = `${data.senderAddress}, ${data.senderCity}, ${data.senderPincode}, India`;
  const orderId = nanoid();

  const isOrder = await FindByOrderId(orderId);

  if (isOrder) {
    return await CreateOrderBL(data);
  }

  const newOrder = await CreateOrder({
    ...data,
    orderId,
    status,
    currentLocation,
  });
  return newOrder;
};
