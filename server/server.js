var path = require('path')

var express = require('express')
var hbs = require('express-handlebars')

var routes = require('./routes')
// var apiRoutes = require('./apiRoutes')

var app = express()


// Middleware
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../views'))
console.log(__dirname);
app.use(express.static('public'))


// Routes
app.use('/', routes)
// app.use('/api/v1/', apiRoutes)


module.exports = function(db) {
  app.set('db', db)
  return app
}
