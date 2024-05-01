import type { Express, Request, Response } from 'express'
import { FindUser } from './service/user'
import { GetAllOrders } from './service/order'
import { MapUserToRes } from './utility/utility'
import {
    CreateUserBL,
    FindUserBL,
    LoginUserBL,
    UpdateUserBL,
} from './buisnesslayer/user'
import { CreateOrderBL, FindByOrderIdBL } from './buisnesslayer/order'

const express = require('express')
const cors = require('cors')
const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.post('/users/login', async (req: Request, res: Response) => {
    const user = await LoginUserBL(req.body).catch((err) => {
        res.status(400).json({
            title: err.message,
            message: 'please use correct credentials',
        })
    })

    if (user) {
        res.json(MapUserToRes(user))
    }
})

app.post('/users', async (req: Request, res: Response) => {
    const user = await CreateUserBL(req.body).catch((err) => {
        res.status(400).json({
            title: err.message,
            message: 'User already exists',
        })
    })
    if (user) {
        res.send(MapUserToRes(user))
    }
})

app.post('/users/:email/order', async (req: Request, res: Response) => {
    const email = req.params.email
    const user = await FindUser(email).catch((err) => {
        res.status(400).json({
            title: err.message,
            message: 'User not found',
        })
    })

    if (!user) {
        return
    }

    const { ['email']: _, ...orderDetail } = req.body

    const order = await CreateOrderBL({
        ...orderDetail,
        userDetailsEmail: email,
    }).catch((err) => {
        res.status(400).json({ message: err.message })
    })

    if (order) {
        res.send(order.orderId)
    }
})

app.get('/users/:email/orders', async (req: Request, res: Response) => {
    const email = req.params.email
    await FindUserBL(email).catch((err) => {
        res.status(400).json({ title: err.message, message: 'User not found' })
    })

    const orders = await GetAllOrders(email).catch((err) => {
        res.status(400).json({ message: err.message })
    })

    if (orders) {
        res.send(orders)
    }
})

app.get('/users/:orderId', async (req: Request, res: Response) => {
    const orderId = req.params.orderId
    const order = await FindByOrderIdBL(orderId).catch((err) => {
        res.status(400).json({ title: err.message, message: 'Order not found' })
    })
    if (!order) {
        return
    }
    res.send(order)
})

app.put('/users/update/:email', async (req: Request, res: Response) => {
    const email = req.params.email
    const password = req.body.currentPassword
    console.log(password)
    const updatedUser = await UpdateUserBL({
        ...req.body,
        email,
        oldPassword: password,
    }).catch((err) => {
        res.status(400).json({ message: err.message })
    })

    if (!updatedUser) {
        return
    }
    res.send(updatedUser)
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})
