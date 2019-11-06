const nunjucks = require('nunjucks')
nunjucks.configure({ autoescape: true })

const result = nunjucks.renderString('Hello {{ username }}', { username: 'James' })
console.log(result)
