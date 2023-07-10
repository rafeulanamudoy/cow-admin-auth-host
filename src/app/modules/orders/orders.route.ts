import express from 'express'
import { OrderController } from './orders.controller'
import auth from '../../middleware/auth'
import { Enum_Role } from '../../enums/role'
import orderAuth from '../../middleware/orderAuth'
import specificOrderAuth from '../../middleware/specificOrderAuth'

const router = express.Router()
export const OrderRouter = router

router.post('/', auth(Enum_Role.BUYER), OrderController.createOrders)
router.get('/', orderAuth(), OrderController.getOrders)
router.get('/:id', specificOrderAuth(), OrderController.getSingleOrder)
