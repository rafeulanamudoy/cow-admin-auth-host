import { ICow } from './cow.interface'
import { Cow } from './cow.model'

const createCow = async (cow: ICow): Promise<ICow | null> => {
  console.log(cow)
  const createdCow = await Cow.create(cow)
  return createdCow
}

export const CowService = {
  createCow,
}
