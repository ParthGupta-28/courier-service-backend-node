import { z } from "zod";
import { OrderStatus } from "../interfaces/order";

const CreateOrder = z.object({
  orderId: z.string(),

  senderName: z.string(),
  senderCity: z.string(),
  senderState: z.string(),
  senderPincode: z.string().length(6),
  senderAddress: z.string(),
  senderPhoneNo: z.string().min(10),

  receiverName: z.string(),
  receiverCity: z.string(),
  receiverState: z.string(),
  receiverPincode: z.string().length(6),
  receiverAddress: z.string(),
  receiverPhoneNo: z.string().min(10),

  currentLocation: z.string(),
  status: z.enum(OrderStatus),
});

export const OrderSchema = {
  CreateOrder,
};
