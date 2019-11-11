const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')
const formidable = require('formidable')

const app = express()

nunjucks.configure(path.join(__dirname, '../views/'), {
  autoescape: true,
  express: app,
  noCache: true // 禁用缓存
})

app.get('/', (req, res, next) => {
  res.render('demo.html')
})

app.post('/', (req, res, next) => {
  var form = new formidable.IncomingForm()

  form.uploadDir = './upload'
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(files)
  })
})

app.listen(3000, () => {
  console.log('server is running')
})
