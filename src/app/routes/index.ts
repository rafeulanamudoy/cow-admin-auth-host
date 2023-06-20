import express from 'express'
import { UserRoutes } from '../modules/user/user.route'

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
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export const routes = router
