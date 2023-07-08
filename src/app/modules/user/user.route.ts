import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './user.validation'

const router = express.Router()

export const UserRoutes = router

router.post('/signUp', UserController.createUser)
router.post('/login', UserController.userLogin)
router.get('/:id', UserController.getSingleUser)
router.patch('/:id', UserController.updateSingleUser)
router.delete('/:id', UserController.deleteSingleUser)
router.get('/', UserController.getUsers)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  UserController.refreshToken
)
//api/v1/auth/signup
