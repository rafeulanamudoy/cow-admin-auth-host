import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'
import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body
  console.log(user)

  const result = await UserService.createUser(user)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Users created successfully',
    data: result,
  })
})
export const UserController = {
  createUser,
}
