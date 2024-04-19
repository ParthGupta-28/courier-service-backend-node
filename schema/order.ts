import { z } from "zod";
import { OrderStatus } from "../interfaces/order";

const CreateOrder = z.object({
  orderId: z.string(),

  senderName: z.string({
    required_error: "Sender name is required",
    invalid_type_error: "Sender name must be a string",
  }),
  senderCity: z.string(),
  senderState: z.string(),
  senderPincode: z.string().length(6, "pincode must be 6 digits"),
  senderAddress: z.string(),
  senderPhoneNo: z.string().min(10, "phone no must be 10 digits"),

  receiverName: z.string(),
  receiverCity: z.string(),
  receiverState: z.string(),
  receiverPincode: z.string().length(6, "pincode must be 6 digits"),
  receiverAddress: z.string(),
  receiverPhoneNo: z.string().min(10, "phone no must be 10 digits"),

  currentLocation: z.string(),
  status: z.enum(OrderStatus),
});

export const OrderSchema = {
  CreateOrder,
};
