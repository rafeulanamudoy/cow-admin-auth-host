import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

export const UserRoutes = router

router.post('/signUp', UserController.createUser)
router.get('/:id', UserController.getSingleUser)
router.patch('/:id', UserController.updateSingleUser)
router.delete('/:id', UserController.deleteSingleUser)
router.get('/', UserController.getUsers)

//api/v1/auth/signup
