var createServer = require('./server')
var config = require('../knexfile')[process.env.NODE_ENV || 'development']
var knex = require('knex')(config)

var server = createServer(knex)

var PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('listening on 3000')
})
