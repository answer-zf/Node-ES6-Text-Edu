import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'

// 加载路由模块
import advertRouter from './routes/advert'
import indexRouter from './routes/index'

// 加载中间件模块
import bodyParser from './middleware/body_parser'
import errLog from './middleware/error_log'

const app = express()

app.use('/node_modules/', express.static(config.node_modules_path))
app.use('/public/', express.static(config.public_path))

nunjucks.configure(config.view_path, {
  autoescape: true,
  express: app,
  noCache: true // 禁用缓存
})

// 挂载解析表单 POST 请求体中间件
app.use(bodyParser)

// 挂载路由
app.use(indexRouter)
app.use(advertRouter)

// 挂载全局错误处理中间件
app.use(errLog)

app.listen(3000, () => {
  console.log('server is running')
})
