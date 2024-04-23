import type { Prisma } from '@prisma/client'
import { nanoid } from '../utility/utility'
import type { IOrderBL, IOrderCreateResponse } from '../interfaces/order'
import { CreateOrder, FindByOrderId } from '../service/order'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const CreateOrderBL = async (
    data: IOrderBL,
): Promise<IOrderCreateResponse> => {
    const status = 'Pending'
    const currentLocation = `${data.senderAddress}, ${data.senderCity}, ${data.senderPincode}, India`
    const orderId = nanoid()

    const isOrder = await FindByOrderId(orderId)

    if (isOrder) {
        return await CreateOrderBL(data)
    }

    const newOrder = await CreateOrder({
        ...data,
        orderId,
        status,
        currentLocation,
    })

    const { error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [newOrder.userDetailsEmail],
        subject: 'hello world',
        html: '<strong>it works!</strong>',
    })

    return newOrder
}
