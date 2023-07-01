import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CowService } from './cow.service'
import { Request, Response, NextFunction } from 'express'
import { ICow } from './cow.interface'
import pick from '../../../shared/pick'
import { paginationFileds } from '../../../constants/pagination'
import { cowFilterableField } from './cow.constant'

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
const deleteSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await CowService.deleteSingleCow(id)
    sendResponse<ICow>(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Cow deleted successfully',
      data: result,
    })
    next()
  }
)
const getCows = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFileds)
    const filters = pick(req.query, cowFilterableField)
    console.log(
      filters,
      paginationOptions,
      'i am from controller to check filters'
    )
    const result = await CowService.getCows(filters, paginationOptions)

    sendResponse<ICow[]>(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: 'Cow retrived successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)
export const CowController = {
  createCow,
  getSingleCow,
  updateSingleCow,
  deleteSingleCow,
  getCows,
}
