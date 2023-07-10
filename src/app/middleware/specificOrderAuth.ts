import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { JwtPayload, Secret } from 'jsonwebtoken'
import { Order } from '../modules/orders/orders.model'
import { Cow } from '../modules/cow/cow.model'

const specificOrderAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      // verify token
      let verifiedUser: JwtPayload

      // eslint-disable-next-line prefer-const
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)

      req.user = verifiedUser // role  , _id
      //for buyer portion
      const orderId = req.params.id
      const order = await Order.findById(orderId).lean()
      //for seller portion

      const cowOwner = await Cow.findById(order?.cow).populate('seller').lean()

      if (
        (verifiedUser.role === 'buyer' && order?.buyer !== verifiedUser._id) ||
        (verifiedUser.role == 'seller' &&
          cowOwner?.seller._id?.toString() !== verifiedUser._id)
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'you are forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export default specificOrderAuth
