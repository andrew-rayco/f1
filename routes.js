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

// show all races in selected season
router.get('/season/:id', (req, res) => {
  var db = req.app.get('db')
  var id = req.params.id
  db('races')
    .select('races.year as season-year', 'races.url as races-url', '*')
    .join('seasons', 'seasons.year', '=', 'races.year')
    .where('races.year', id)
    .then((season) => {
        res.render('season', {season})
  })
})

// display a list of starting positions for the race
router.get('/season/:id/:raceId/grid', (req, res) => {
  var db = req.app.get('db')
  var season = req.params.id
  var raceId = req.params.raceId
  db('qualifying')
    .select('constructors.name as constructorName', 'constructors.url as constructorUrl', 'races.name as raceName', 'qualifying.*', 'drivers.*')
    .join('drivers', 'qualifying.driverId', '=', 'drivers.driverId')
    .join('races', 'races.raceId', '=', 'qualifying.raceId')
    .join('constructors', 'qualifying.constructorId', '=', 'constructors.constructorId')
    .where('qualifying.raceId', raceId)
    // .groupBy('raceName')
    .then((qualifyingData) => {
      if (qualifyingData[0]) {
        res.render('grid', {qualifyingData, raceName:qualifyingData[0].raceName})
      } else {
        res.render('no-laptime-data')
      }
    })
})

// make the race happen!
router.get('/season/:id/:raceId/laptimes', (req, res) => {
  var db = req.app.get('db')
  var id = req.params.id
  var raceId = req.params.raceId
  if (raceId < 972 && raceId > 840) {
    db('laptimes')
      .select('*')
      .where('laptimes.raceId', raceId)
      .orderBy('lap', 'asc')
      .then((laptimes) => {
        let raceData = prepareRaceData(laptimes) // convert data into multi-dimensional array
        res.render('laptimes', {laptimes})
      })
  }
  else {
    res.render('no-laptime-data')
  }
})



// display laptimes per driver for selected race
// router.get('/season/:id/:raceId/laptimes', (req, res) => {
//   var db = req.app.get('db')
//   var id = req.params.id
//   var raceId = req.params.raceId
//   if (raceId < 972 && raceId > 840) {
//     db('laptimes')
//       .select('*')
//       .where('laptimes.raceId', raceId)
//       .orderBy('lap', 'asc')
//       .then((laptimes) => {
//         res.render('laptimes', {laptimes})
//       })
//   }
//   else {
//     res.render('no-laptime-data')
//   }
// })


module.exports = router
