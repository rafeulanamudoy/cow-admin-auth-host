import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './user.validation'
import auth from '../../middleware/auth'
import { Enum_Role } from '../../enums/role'

const router = express.Router()

export const UserRoutes = router
router.get(
  '/my-profile',
  auth(Enum_Role.BUYER, Enum_Role.SELLER),
  UserController.getMyProfile
)
router.patch(
  '/my-profile',
  auth(Enum_Role.BUYER, Enum_Role.SELLER),
  UserController.updateMyProfile
)
router.post('/signUp', UserController.createUser)
router.post('/login', UserController.userLogin)
router.get('/:id', auth(Enum_Role.ADMIN), UserController.getSingleUser)
router.patch('/:id', auth(Enum_Role.ADMIN), UserController.updateSingleUser)
router.delete('/:id', auth(Enum_Role.ADMIN), UserController.deleteSingleUser)
router.get('/', auth(Enum_Role.ADMIN), UserController.getUsers)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  UserController.refreshToken
)

//api/v1/auth/signup
