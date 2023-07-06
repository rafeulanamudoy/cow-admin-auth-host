import { IAdmin } from './admin.interface'
import { Admin } from './admin.model'

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  // console.log(user)

  const createUser = await Admin.create(admin)
  return createUser
}

export const AdminService = {
  createAdmin,
}
