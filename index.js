var createServer = require('./server')
var development = require('./knexfile').development
var knex = require('knex')(development)

var server = createServer(knex)

var PORT = 3000

server.listen(PORT, () => {
  console.log('listening on 3000')
})
