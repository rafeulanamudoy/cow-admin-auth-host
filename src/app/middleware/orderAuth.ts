import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'
import { Order } from '../modules/orders/orders.model'
import { Cow } from '../modules/cow/cow.model'

const orderAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      // verify token
      let verifiedUser: any

      // eslint-disable-next-line prefer-const
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)

      req.user = verifiedUser // role  , _id

      const orders = await Order.find({}).lean()
      // const orderCow = orders.find(order => order.cow)

      const buyerOrderExist = orders.find(
        order => order.buyer === verifiedUser._id
      )

      ///for seller portion
      //to get the seller cow from cow model
      const sellerCow = await Cow.find({ seller: verifiedUser._id }).lean()
      //to check weither the seller cow exist in order model
      const sellerCowId = sellerCow.map(cow => cow._id.toString())
      //console.log(sellerCowId)
      const sellerCowInOrder = orders.filter(order =>
        sellerCowId.includes(order.cow)
      )
      // console.log(sellerCowInOrder.length, 'in order section is cow exist')

      //console.log(resutl, 'the order cow that ')

      if (
        (verifiedUser.role == 'seller' && sellerCowInOrder.length === 0) ||
        (verifiedUser.role === 'buyer' && !buyerOrderExist)
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'your have no order to show')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default orderAuth
