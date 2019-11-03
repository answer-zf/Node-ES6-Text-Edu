import express from 'express'
import path from 'path'

const app = express()

app.use('/node_modules/', express.static(path.join('./node_modules/')))

app.use('/public/', express.static(path.join(__dirname, './public/')))

app.engine('html', require('express-art-template'))

app.get('/', (req, res) => {
  res.render('index.html')
})

app.listen(3000, () => {
  console.log('server is running')
})
