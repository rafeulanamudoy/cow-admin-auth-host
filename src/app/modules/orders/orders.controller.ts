import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { OrderService } from './orders.service'
import { IOrder } from './orders.interface'

import { IUser } from '../user/user.interface'

const createOrders = catchAsync(async (req: Request, res: Response) => {
  const order = req.body

  const result = await OrderService.createOrder(order)
  // console.log(result)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'order   successfully Post',
    data: result,
  })
})
const getOrders = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line prefer-const
  const user = req.user as IUser

  // console.log(user, 'from controller')
  const result = await OrderService.getOrders(user)

  sendResponse<IOrder[]>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Orders retrieved successfully',
    data: result,
  })
})

export const OrderController = {
  createOrders,
  getOrders,
}
