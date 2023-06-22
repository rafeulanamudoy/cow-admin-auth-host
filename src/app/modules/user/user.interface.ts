export type IUserRole = 'seller' | 'buyer'

export type IUser = {
  password: string
  role: IUserRole
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string

  address: string
  budget: number
  income: number
}
