var test = require('tape')
var request = require('supertest')
var cheerio = require('cheerio')

var app = require('../server')


test('hello', (t) => {
  request(app)
    .get('/')
    .end( (err, res) => {
      var $ = cheerio.load(res.text)
      t.equal($('h1').text(), 'hello', 'content is hello')
      t.end()
    })
})
