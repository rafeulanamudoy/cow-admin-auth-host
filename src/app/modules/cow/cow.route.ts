import express from 'express'
import { CowController } from './cow.controller'

const router = express.Router()
export const CowRouter = router

router.post('/', CowController.createCow)
