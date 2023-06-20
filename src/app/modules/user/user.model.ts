import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import { UserRole } from './user.constant'

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: UserRole,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser>('User', userSchema)
