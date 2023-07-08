/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose'

export type IAdminRole = 'admin'

export type IAdmin = {
  phoneNumber: string
  role: IAdminRole
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
}
export type ILoginAdmin = {
  phoneNumber: string
  password: string
}
export type IAdminExistReturn = {
  _id: mongoose.ObjectId
  phoneNumber: string
  role: string
  password: string
}
export type ILoginAdminRespone = {
  refreshToken?: string
  accessToken: string
}

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<
    Pick<IAdminExistReturn, 'password' | 'role' | 'phoneNumber' | '_id'>
  >
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IAdmin>
