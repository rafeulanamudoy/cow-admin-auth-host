import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'
import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'

import catchAsync from '../../../shared/catchAsync'
import { IUser } from './user.interface'
import config from '../../../config'
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    // console.log(user)

    const result = await UserService.createUser(user)

    console.log(result)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Users created successfully',
      data: result,
    })
    next()
  }
)

const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getUsers()

    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Users retrieved successfully',
      data: result,
    })
    next()
  }
)

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await UserService.getSingleUser(id)

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'User retrieved successfully',
      data: result,
    })
    next()
  }
)
const updateSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    next()
  }
)

const deleteSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await UserService.deleteSingleUser(id)

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'User Deleted successfully',
      data: result,
    })
    next()
  }
)
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
export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  userLogin,
}
