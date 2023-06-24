import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CowService } from './cow.service'
import { Request, Response, NextFunction } from 'express'
import { ICow } from './cow.interface'

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

const getSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await CowService.getSingleCow(id)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Cow retrieved successfully',
      data: result,
    })
    next()
  }
)
const updateSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const updateData = req.body
    console.log(updateData)

    const result = await CowService.updateSingleCow(id, updateData)

    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Cow updated successfully',
      data: result,
    })
    next()
  }
)

export const CowController = {
  createCow,
  getSingleCow,
  updateSingleCow,
}
