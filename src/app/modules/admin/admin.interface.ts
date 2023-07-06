export type IAdminRole = 'admin'

export type IAdmin = {
  phoneNumber: string
  role: IAdminRole
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
}
