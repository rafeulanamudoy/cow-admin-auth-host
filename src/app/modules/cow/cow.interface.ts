import { Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type ICowLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'

export type ICowLabel = 'for sale' | 'sold out'
export type ICowFilters = {
  query?: string
}
export type ICowCatagory = 'Dairy ' | 'Beef' | 'DualPurpose '
export type ICow = {
  name: string
  age: number
  price: number
  location: ICowLocation
  breed: string
  weight: string
  label: ICowLabel
  category: ICowCatagory
  seller: Types.ObjectId | IUser
}
