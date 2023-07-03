import { Schema, model } from 'mongoose'
import { IOrder } from './orders.interface'

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
export const Order = model<IOrder>('Order', orderSchema)
