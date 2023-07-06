import express from 'express'
import { AdminController } from './admin.controller'

const router = express.Router()

export const AdminRouter = router

router.post('/create-admin', AdminController.createAdmin)
