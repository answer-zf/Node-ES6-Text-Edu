import express from 'express'
import path from 'path'
import config from './config'

const app = express()

app.use('/node_modules/', express.static(config.node_modules_path))

app.use('/public/', express.static(config.public_path))

app.engine('html', require('express-art-template'))
app.set('views', config.view_path)

app.get('/', (req, res) => {
  res.render('index.html')
})

app.listen(3000, () => {
  console.log('server is running')
})
