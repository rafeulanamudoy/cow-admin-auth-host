import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

import { AdminService } from './admin.service'
import { IAdmin } from './admin.interface'
import { Admin } from './admin.model'

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
  const admin = req.body
  console.log(admin)
})

export const AdminController = {
  createAdmin,
  adminLogin,
}
