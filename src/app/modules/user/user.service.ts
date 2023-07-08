import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { ILoginUser, ILoginUserResponse, IUser } from './user.interface'
import { User } from './user.model'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // console.log(user)

  if (user?.role === 'seller' && user.budget > 0) {
    throw new ApiError(400, 'you cannot set budget  you may can set income')
  } else if (user?.role === 'buyer' && user.income > 0) {
    throw new ApiError(400, 'you cannot set income you may set budget')
  } else {
    const createUser = await User.create(user)
    return createUser
  }
}
const getUsers = async (): Promise<IUser[] | null> => {
  const getUsers = await User.find({})
  return getUsers
}
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const getUser = await User.findById(id)
  return getUser
}
const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
const deleteSingleUser = async (id: string): Promise<IUser | null> => {
  const deleteUser = await User.findByIdAndDelete(id)
  return deleteUser
}
const userLogin = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { phoneNumber, password } = payload

  const isUserExist = await User.isUserExist(phoneNumber)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Doesn,t Exist')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  const { _id, role } = isUserExist
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
export const UserService = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  userLogin,
}
