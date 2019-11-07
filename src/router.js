import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index.html')
})

router.post('/advert/add', (req, res, next) => {
  console.log(req.body)
})

export default router
