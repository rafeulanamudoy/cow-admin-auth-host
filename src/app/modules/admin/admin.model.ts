import { Schema, model } from 'mongoose'
import { IAdmin } from './admin.interface'
import { AdminRole } from './admin.constant'
import config from '../../../config'
import bcrypt from 'bcrypt'

const adminSchema = new Schema<IAdmin>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: AdminRole,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
adminSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  )
  next()
})

export const Admin = model<IAdmin>('Admin', adminSchema)
