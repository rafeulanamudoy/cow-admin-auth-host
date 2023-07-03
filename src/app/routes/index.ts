import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { CowRouter } from '../modules/cow/cow.route'
import { OrderRouter } from '../modules/orders/orders.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRouter,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export const routes = router
