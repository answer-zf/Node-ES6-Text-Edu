import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/edu'

export default (errLog, req, res, next) => {
  // 打开连接
  MongoClient.connect(url, (err, db) => {
    // 操作数据库
    db.collection('error_logs').insertOne(
      {
        name: errLog.name,
        message: errLog.message,
        stack: errLog.stack,
        time: new Date()
      },
      (err, result) => {
        res.json({
          err_code: 500,
          message: errLog.message
        })
      }
    )
    // 关闭连接
    db.close()
  })
}
