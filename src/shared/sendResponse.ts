import { Response } from 'express'

type ISendResponse<T> = {
  success: boolean
  statusCode: number
  message: string | null
  data?: T | null
  meta?: {
    page: number
    limit: number
    count: number
  }
}

const sendResponse = <T>(res: Response, data: ISendResponse<T>): void => {
  const responseData = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    data: data.data,
  }
  res.status(data.statusCode).json(responseData)
}

export default sendResponse
