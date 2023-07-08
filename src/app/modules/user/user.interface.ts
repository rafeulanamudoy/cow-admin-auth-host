/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose'

export type IUserRole = 'seller' | 'buyer'

export type IUser = {
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
  _id: mongoose.ObjectId
  phoneNumber: string
  role: string
  password: string
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
