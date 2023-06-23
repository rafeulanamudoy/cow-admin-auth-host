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
export const UserService = {
  createUser,
  getUsers,
}
