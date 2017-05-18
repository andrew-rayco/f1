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
        res.render('season', {season})
  })
})

router.get('/season/:id/:raceId/drivers', (req, res) => {
  var db = req.app.get('db')
  var id = req.params.id
  var raceId = req.params.raceId
  console.log('id', id, 'raceId', raceId)
  if (raceId < 972 && raceId > 0) {
    db('laptimes')
      .select('*')
      // .join('laptimes', 'races.raceId', '=', 'laptimes.raceId')
      .where('laptimes.raceId', raceId)
      .then((laptimes) => {
        console.log(laptimes);
        res.render('drivers-in-race', {laptimes})
      })

  }
  else console.log("No lap data");
})

module.exports = router
