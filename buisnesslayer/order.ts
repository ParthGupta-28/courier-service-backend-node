import type { Prisma } from '@prisma/client'
import { nanoid } from '../utility/utility'
import type { IOrderBL, IOrderCreateResponse } from '../interfaces/order'
import { CreateOrder, FindByOrderId } from '../service/order'
import { EmailTemplate } from './emailtemplate'
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
        from: 'BonVoyage <team@bonvoyage.com>',
        to: [newOrder.userDetailsEmail],
        subject: 'Bon Voyage: Courier Order Details',
        html: EmailTemplate(newOrder),
    })
    if (error) {
        console.error(error)
    }

    return newOrder
}

export const FindByOrderIdBL = async (orderId: string) => {
    const order = await FindByOrderId(orderId)

    if (!order) {
        throw new Error('Order not found')
    }
    return order
}
