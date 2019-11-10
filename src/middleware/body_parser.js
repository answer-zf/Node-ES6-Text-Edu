import queryString from 'querystring'
export default (req, res, next) => {
  if (!req.headers['content-length']) {
    return next()
  }
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    req.body = queryString.parse(data)
    next()
  })
}
