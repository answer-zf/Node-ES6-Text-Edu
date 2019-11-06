import express from 'express'
import path from 'path'
import config from './config'
import nunjucks from 'nunjucks'

const app = express()

app.use('/node_modules/', express.static(config.node_modules_path))
app.use('/public/', express.static(config.public_path))

nunjucks.configure(config.view_path, {
  autoescape: true,
  express: app
})

app.get('/', (req, res) => {
  res.render('index.html')
})

app.listen(3000, () => {
  console.log('server is running')
})
