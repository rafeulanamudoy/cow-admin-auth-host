import express from 'express'
import { AdminController } from './admin.controller'
import validateRequest from '../../middleware/validateRequest'
import { loginValidation } from '../../../shared/loginValidation'

const router = express.Router()

export const AdminRouter = router

router.post(
  '/create-admin',

  AdminController.createAdmin
)
router.post(
  '/login',
  validateRequest(loginValidation.loginZodSchema),
  AdminController.adminLogin
)
