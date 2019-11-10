import express from 'express'
import * as advertController from '../controllers/advert'

const router = express.Router()

router.get('/advert/list', advertController.listAdvert())
router.post('/advert/add', advertController.addAdvert())
router.get('/advert/one/:advertId', advertController.showEditAdvert())
router.post('/advert/edit', advertController.editAdvert())
router.get('/advert/remove/:advertId', advertController.removeAdvert())

export default router
