import { z } from 'zod'
import { OrderStatus } from '../interfaces/order'

const CreateOrder = z.object({
    orderId: z.string(),

    senderName: z
        .string({
            required_error: 'Sender name is required',
            invalid_type_error: 'Sender name must be a string',
        })
        .min(1, 'sender name cannot be empty'),
    senderCity: z.string().min(1, 'sender city cannot be empty'),
    senderState: z.string().min(1, 'sender state cannot be empty'),
    senderPincode: z.string().length(6, 'pincode must be 6 digits'),
    senderAddress: z.string().min(1, 'sender address cannot be empty'),
    senderPhoneNo: z.string().min(10, 'phone no must be 10 digits'),

    receiverName: z.string().min(1, 'receiver name cannot be empty'),
    receiverCity: z.string().min(1, 'receiver city cannot be empty'),
    receiverState: z.string().min(1, 'receiver state cannot be empty'),
    receiverPincode: z.string().length(6, 'pincode must be 6 digits'),
    receiverAddress: z.string().min(1, 'receiver address cannot be empty'),
    receiverPhoneNo: z.string().min(10, 'phone no must be 10 digits'),

    currentLocation: z.string().min(1, 'current location cannot be empty'),
    status: z.enum(OrderStatus),
})

export const OrderSchema = {
    CreateOrder,
}
