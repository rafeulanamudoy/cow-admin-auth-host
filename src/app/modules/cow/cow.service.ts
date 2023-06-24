import { ICow } from './cow.interface'
import { Cow } from './cow.model'

const createCow = async (cow: ICow): Promise<ICow | null> => {
  console.log(cow)
  const createdCow = await Cow.create(cow)
  return createdCow
}
const getSingleCow = async (id: string): Promise<ICow | null> => {
  const getCow = await Cow.findById(id).populate('seller')
  return getCow
}

export const CowService = {
  createCow,
  getSingleCow,
}
