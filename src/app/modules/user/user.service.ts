import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createUser = await User.create(user)
  return createUser
}
const getUsers = async (): Promise<IUser[] | null> => {
  const getUsers = await User.find({})
  return getUsers
}
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const getUsers = await User.findById(id)
  return getUsers
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
