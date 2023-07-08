import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

import { AdminService } from './admin.service'
import { IAdmin, ILoginAdminRespone } from './admin.interface'

import config from '../../../config'

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const admin = req.body

  const result = await AdminService.createAdmin(admin)
  if (result !== null) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...others } = result

    sendResponse<Partial<IAdmin>>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin created successfully',
      data: others,
    })
  }
})
const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AdminService.loginAdmin(loginData)
  console.log(result)

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  if (result !== null) {
    const { refreshToken, ...others } = result

    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Admin logged in successfully!',
      data: others,
    })
  } else {
    // Handle the case when result is null
    sendResponse<ILoginAdminRespone>(res, {
      statusCode: 404,
      success: false,
      message: 'Admin not found.',
      data: null,
    })
  }
})

export const AdminController = {
  createAdmin,
  adminLogin,
}
