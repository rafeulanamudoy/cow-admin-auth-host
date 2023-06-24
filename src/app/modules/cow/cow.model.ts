import { Schema, model } from 'mongoose'
import { ICow } from './cow.interface'
import { CowCatagory, CowLabel, CowLocation } from './cow.constant'

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      enum: CowLocation,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: CowLabel,
    },
    category: {
      type: String,
      required: true,
      enum: CowCatagory,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<ICow>('Cow', cowSchema)
