import express from 'express'
import { CowController } from './cow.controller'
import auth from '../../middleware/auth'
import { Enum_Role } from '../../enums/role'
import specificSellerAuth from '../../middleware/specificSellerAuth'

const router = express.Router()
export const CowRouter = router

router.post('/', auth(Enum_Role.SELLER), CowController.createCow)
router.get('/:id', CowController.getSingleCow)
router.patch('/:id', specificSellerAuth(), CowController.updateSingleCow)
router.delete('/:id', specificSellerAuth(), CowController.deleteSingleCow)
router.get('/', CowController.getCows)
