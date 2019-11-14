import express from 'express'
import * as advertController from '../controllers/advert'

const router = express.Router()

router
  .get('/advert', advertController.showAdvert)
  .get('/advert/add', advertController.showAddAdvert)
  .post('/advert/add', advertController.addAdvert)
  .get('/advert/one/:advertId', advertController.showEditAdvert)
  .post('/advert/edit', advertController.editAdvert)
  .get('/advert/remove/:advertId', advertController.removeAdvert)
  .get('/advert/count', advertController.countAdvert)
  .get('/advert/list', advertController.listAdvert)

export default router
