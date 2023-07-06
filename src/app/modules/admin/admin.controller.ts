import catchAsync from '../../../shared/catchAsync'
import { Request, Response, NextFunction } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IAdmin } from './admin.interface'
import { AdminService } from './admin.service'
const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.body
    console.log(admin)

    const result = await AdminService.createAdmin(admin)

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Admin created successfully',
      data: result,
    })
    next()
  }
)

export const AdminController = {
  createAdmin,
}
