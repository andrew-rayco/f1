var test = require('tape')
var request = require('supertest')
var app = require('../server')


test('hello', (t) => {
  request(app)
    .get('/')
    .end( (err, res) => {
      t.equal(res.text, 'hello', 'content is hello')
      t.end()
    })
})
