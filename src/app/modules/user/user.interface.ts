/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose'

export type IUserRole = 'seller' | 'buyer'

export type IUser = {
  _id?: mongoose.Types.ObjectId
  password: string
  role: IUserRole
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string

  address: string
  budget: number
  income: number
}
export type IUserExistReturn = {
  _id: mongoose.Types.ObjectId
  phoneNumber: string
  role: string
  password: string
}
export type ILoginUser = {
  phoneNumber: string
  password: string
}
export type ILoginUserResponse = {
  refreshToken?: string
  accessToken: string
}
export type IRefreshTokenResponse = {
  accessToken: string
}

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<
    Pick<IUserExistReturn, 'password' | 'role' | 'phoneNumber' | '_id'>
  >
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
