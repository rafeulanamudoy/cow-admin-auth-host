import express from 'express'
import { OrderController } from './orders.controller'
import auth from '../../middleware/auth'
import { Enum_Role } from '../../enums/role'
import orderAuth from '../../middleware/orderAuth'

const router = express.Router()
export const OrderRouter = router

router.post('/', auth(Enum_Role.BUYER), OrderController.createOrders)
router.get('/', orderAuth(), OrderController.getOrders)
