import express from 'express'
import { CowController } from './cow.controller'
import auth from '../../middleware/auth'
import { Enum_Role } from '../../enums/role'

const router = express.Router()
export const CowRouter = router

router.post('/', auth(Enum_Role.SELLER), CowController.createCow)
router.get('/:id', auth(Enum_Role.SELLER), CowController.getSingleCow)
router.patch('/:id', auth(Enum_Role.SELLER), CowController.updateSingleCow)
router.delete('/:id', auth(Enum_Role.SELLER), CowController.deleteSingleCow)
router.get('/', CowController.getCows)
