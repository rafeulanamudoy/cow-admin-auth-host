import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'
import { IpaginationOptions } from '../../interfaces/pagination'
import { ICow, ICowFilters } from './cow.interface'
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
const updateSingleCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSingleCow = async (id: string): Promise<ICow | null> => {
  const deleteCow = await Cow.findByIdAndDelete(id)
  return deleteCow
}

const cowSearchableField = [
  'query',
  'location',
  'breed,age',
  'category',
  'weight',
  'label',
]

const getCows = async (
  filters: ICowFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const { query, ...filtersData } = filters

  //const { price, age } = filtersData

  console.log(filtersData, 'i am from service to check filter data')
  const andCondition = []

  if (query) {
    andCondition.push({
      $or: cowSearchableField.map(field => ({
        [field]: {
          $regex: query,
          $options: 'i',
        },
      })),
    })
  }
  //console.log(filtersData, query, 'im from service')
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === 'price' || field === 'age') {
          const numericValue = parseFloat(value as string)

          return { [field]: numericValue }
        } else if (field === 'minPrice') {
          const parsingMinPrice = parseInt(value as string)
          return { price: { $lt: parsingMinPrice } }
        } else if (field === 'maxPrice') {
          const parsingMaxPrice = parseInt(value as string)
          return { price: { $gt: parsingMaxPrice } }
        }
        return { [field]: { $regex: value as string, $options: 'i' } }
      }),
    })
  }
  console.log(andCondition, 'i am from service to check entries')

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  console.log(sortCondition, 'to check sort condition')
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}

  const result = await Cow.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const count = await Cow.countDocuments()
  if (andCondition.length > 0) {
    return {
      meta: {
        page,
        limit,
      },
      data: result,
    }
  } else {
    return {
      meta: {
        page,
        limit,
        count,
      },
      data: result,
    }
  }
}

export const CowService = {
  createCow,
  getSingleCow,
  updateSingleCow,
  deleteSingleCow,
  getCows,
}
// if (Object.keys(filtersData).length) {
//     andCondition.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: { $regex: value, $options: 'i' },
//       })),
//     })
//   }
