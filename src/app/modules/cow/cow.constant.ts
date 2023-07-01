import { ICowLocation } from './cow.interface'

export const CowLocation: ICowLocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
]

export const CowLabel = ['for sale', 'sold out']
export const CowCatagory = ['Dairy ', 'Beef', 'DualPurpose ']
export const cowFilterableField = [
  'query',
  'location',
  'breed',
  'category',
  'age',
  'price',
  'weight',
  'name',
  'minPrice',
  'maxPrice',
]
