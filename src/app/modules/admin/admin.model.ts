import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin, IAdminExistReturn } from './admin.interface'
import { AdminRole } from './admin.constant'
import config from '../../../config'
import bcrypt from 'bcrypt'

const adminSchema = new Schema<IAdmin, AdminModel>(
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

adminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<IAdminExistReturn | null> {
  return await Admin.findOne(
    { phoneNumber },
    { _id: 1, phoneNumber: 1, password: 1, role: 1 }
  )
}
adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}
adminSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  )
  next()
})

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
