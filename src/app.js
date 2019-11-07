import express from 'express'
import path from 'path'
import config from './config'
import nunjucks from 'nunjucks'
import router from './router'
import queryString from 'querystring'

const app = express()

app.use('/node_modules/', express.static(config.node_modules_path))
app.use('/public/', express.static(config.public_path))

nunjucks.configure(config.view_path, {
  autoescape: true,
  express: app
})

app.use((req, res, next) => {
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    req.body = queryString.parse(data)
    next()
  })
})

app.use(router)

app.listen(3000, () => {
  console.log('server is running')
})
