import ApiError from '../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  console.log(user)

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
export const UserService = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
}
