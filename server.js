var express = require('express')
var hbs = require('express-handlebars')

var app = express()

app.engine('hbs', hbs({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  res.render('index')
})

module.exports = app
