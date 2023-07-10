import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { JwtPayload, Secret } from 'jsonwebtoken'
import { Cow } from '../modules/cow/cow.model'

const specificSellerAuth =
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

      const cowId = req.params.id
      const cowOwner = await Cow.findById(cowId).populate('seller').lean()

      if (cowOwner?.seller._id?.toString() !== verifiedUser._id) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not owner of this cow'
        )
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export default specificSellerAuth
