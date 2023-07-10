import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'
import httpStatus from 'http-status'
import { Request, Response } from 'express'

import catchAsync from '../../../shared/catchAsync'
import { IRefreshTokenResponse, IUser } from './user.interface'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { JwtPayload, Secret } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body

  const result = await UserService.createUser(user)
  // eslint-disable-next-line no-unused-vars
  if (result !== null) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...others } = result
    console.log(result)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Users created successfully',
      data: others,
    })
  }
})

const getUsers = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user, 'i am from user controller of user')
  console.log(req.headers.authorization)
  const result = await UserService.getUsers()

  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Users retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.getSingleUser(id)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'User retrieved successfully',
    data: result,
  })
})
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body
  console.log(updateData)

  const result = await UserService.updateSingleUser(id, updateData)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'User updated successfully',
    data: result,
  })
})

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.deleteSingleUser(id)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'User Deleted successfully',
    data: result,
  })
})
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await UserService.userLogin(loginData)
  //console.log(result)

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  if (result !== null) {
    const { refreshToken, ...others } = result

    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully!',
      data: others,
    })
  }
})
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  //console.log('my cookies', req.cookies)
  const result = await UserService.refreshToken(refreshToken)
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'New access token generated successfully !',
    data: result,
  })
})

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
  }
  let verifiedUser: JwtPayload

  // eslint-disable-next-line prefer-const
  verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as Secret
  )
  const result = await UserService.getMyProfile(verifiedUser)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Users information retrieved successfully',
    data: result,
  })
})
export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  userLogin,
  refreshToken,
  getMyProfile,
}
