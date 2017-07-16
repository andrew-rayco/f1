var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var api = require('./routes')

var app = express()

app.use(bodyParser.json())
app.use('/api-v1', api)
app.use(express.static(path.join(__dirname, '../public')))

module.exports = function(db) {
  app.set('db', db)
  return app
}
