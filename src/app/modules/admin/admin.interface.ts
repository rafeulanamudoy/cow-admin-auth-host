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

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'password' | 'role' | 'phoneNumber'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IAdmin>
