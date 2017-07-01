// part of the great api experiment of 1 July, 2017
var express = require('express')
var router = express.Router()

// example json api
router.get('/2008/5/results', (req, res) => {
  var db = req.app.get('db')
  db('seasons')
    .orderBy('year', 'asc')
    .then((seasons) => {
    res.json(seasons)
  })
})

module.exports = router
