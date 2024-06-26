import type { $Enums, Prisma } from '@prisma/client'

export type order = {
    orderId: string

    senderName: string
    senderCity: string
    senderState: string
    senderPincode: string
    senderAddress: string
    senderPhoneNo: string

    receiverName: string
    receiverCity: string
    receiverState: string
    receiverPincode: string
    receiverAddress: string
    receiverPhoneNo: string

    currentLocation: string
    status: string
}

export type IOrderCreate = Prisma.OrderDetailsCreateInput

export type IOrderBL = Omit<
    Prisma.OrderDetailsCreateInput,
    'status' | 'currentLocation' | 'orderId'
>

export type IOrderCreateResponse = Omit<
    Prisma.OrderDetailsCreateInput,
    'user'
> & {
    userDetailsEmail: string
}

export type OrderStatus = $Enums.OrderStatus
export const OrderStatus = ['Completed', 'Pending'] as const
