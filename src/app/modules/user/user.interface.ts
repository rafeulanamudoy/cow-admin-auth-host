export type IUserRole = 'seller' | 'buyer'

export type IUser = {
  phoneNumber: string
  role: IUserRole
  name: {
    firstName: string
    lastName: string
  }
  address: string
  budget: number
  income: number
}
