import express from 'express'
import { CowController } from './cow.controller'

const router = express.Router()
export const CowRouter = router

router.post('/', CowController.createCow)
router.get('/:id', CowController.getSingleCow)
router.patch('/:id', CowController.updateSingleCow)
router.delete('/:id', CowController.deleteSingleCow)
router.get('/', CowController.getCows)
