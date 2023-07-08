import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { IAdmin, ILoginAdmin, ILoginAdminRespone } from './admin.interface'
import { Admin } from './admin.model'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  // console.log(user)

  const createUser = (await Admin.create(admin)).toObject()

  return createUser
}

const loginAdmin = async (
  payload: ILoginAdmin
): Promise<ILoginAdminRespone | null> => {
  const { phoneNumber, password } = payload

  const isAdminExist = await Admin.isAdminExist(phoneNumber)

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Doesn,t Exist')
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  const { _id, role } = isAdminExist
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )
  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )
  return {
    accessToken,
    refreshToken,
  }
}
export const AdminService = {
  createAdmin,
  loginAdmin,
}
