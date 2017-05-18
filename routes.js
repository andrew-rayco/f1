var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  var db = req.app.get('db')
  db('seasons')
    .orderBy('year', 'asc')
    .then((seasons) => {
    res.render('index', {seasons})
  })
})

router.get('/circuits', (req, res) => {
  var db = req.app.get('db')
  db('circuits').then(function(circuits) {
    res.render('circuits', {circuits})
  })
})

router.get('/season/:id', (req, res) => {
  var db = req.app.get('db')
  var id = req.params.id
  db('races')
    .select('races.year as season-year', '*')
    .join('seasons', 'seasons.year', '=', 'races.year')
    .where('races.year', id)

    .then((season) => {

        console.log(season);
        res.render('season', {season})


  })
})

module.exports = router
