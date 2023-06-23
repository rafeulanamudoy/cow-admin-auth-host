import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'
import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'

import catchAsync from '../../../shared/catchAsync'
import { IUser } from './user.interface'
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    console.log(user)

    const result = await UserService.createUser(user)

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

export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
}
