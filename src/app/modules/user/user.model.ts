import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import { UserRole } from './user.constant'
import bcrypt from 'bcrypt'
import config from '../../../config'
const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: UserRole,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      default: 0,
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
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  )
  next()
})

export const User = model<IUser>('User', userSchema)
