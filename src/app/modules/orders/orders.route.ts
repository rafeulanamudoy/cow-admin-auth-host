import express from 'express'
import { OrderController } from './orders.controller'

const router = express.Router()
export const OrderRouter = router

router.post('/', OrderController.createOrders)
router.get('/', OrderController.getOrders)
