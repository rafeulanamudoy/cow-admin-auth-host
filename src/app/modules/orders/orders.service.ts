import mongoose from 'mongoose'
import { IOrder } from './orders.interface'
import { Order } from './orders.model'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '../user/user.model'
import { Cow } from '../cow/cow.model'

import { JwtPayload } from 'jsonwebtoken'

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  // console.log(order)
  const buyer = await User.findById(order.buyer)
  const cow = await Cow.findById(order.cow)

  if (buyer && cow && buyer.budget < cow.price) {
    throw new ApiError(
      httpStatus.BAD_GATEWAY,
      "You don't have enough budget to buy the cow"
    )
  }
  const session = await mongoose.startSession()
  let createdOrder = null
  try {
    session.startTransaction()

    createdOrder = await Order.create([order], { session })

    const cowFilter = { label: 'sold out' }
    const BuyerRemainingMoney =
      buyer && cow ? buyer?.budget - cow?.price : undefined
    const sellerId = cow?.seller.toString()
    const buyerFilterMoney = { budget: BuyerRemainingMoney }
    await User.findOneAndUpdate({ _id: order.buyer }, buyerFilterMoney)
    await User.findOneAndUpdate({ _id: sellerId }, { income: cow?.price })
    await Cow.findOneAndUpdate({ _id: order.cow }, cowFilter)

    if (!createdOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Order')
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  return createdOrder[0]
}
const getOrders = async (user: JwtPayload): Promise<IOrder[] | null> => {
  const sellerCow = await Cow.find({ seller: user._id }).lean()
  const sellerCowId = sellerCow.map(cow => cow._id.toString())
  const filter =
    user.role === 'buyer'
      ? { buyer: user._id }
      : user.role === 'seller'
      ? { cow: { $in: sellerCowId } }
      : {}

  const getOrders = await Order.find(filter)

  return getOrders
}
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const getOrder = await Order.findById(id)
  return getOrder
}
export const OrderService = {
  createOrder,
  getOrders,
  getSingleOrder,
}
