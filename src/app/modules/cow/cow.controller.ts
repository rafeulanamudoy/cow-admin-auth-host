import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CowService } from './cow.service'
import { Request, Response, NextFunction } from 'express'

const createCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cow = req.body

    const result = await CowService.createCow(cow)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Cow  created successfully',
      data: result,
    })
    next()
  }
)
export const CowController = {
  createCow,
}
