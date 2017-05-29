var express = require('express')
var router = express.Router()
var moment = require('moment')

var dbFunctions = require('./db-functions')
var functions = require('./functions')

router.get('/', (req, res) => {
  var db = req.app.get('db')
  db('seasons')
    .orderBy('year', 'asc')
    .then((seasons) => {
    res.render('index', {seasons})
  })
})

// react route - Use this for race visualisation!
router.get('/react', (req, res) => {
  var db = req.app.get('db')
  db('seasons')
    .then((seasons) => {
      console.log(seasons);
      res.render('react')
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
  dbFunctions.getRacesInSeason(db, id)
    .then((season) => {
      season.forEach((race) => {
        race.date = moment(race.date).format('MMMM Do YYYY')
      })
        res.render('season', {season})
  })
})

// display qualifying results
router.get('/season/:id/:raceId/qualifying', (req, res) => {
  var db = req.app.get('db')
  var season = req.params.id
  var raceId = req.params.raceId
  dbFunctions.getQualifyingResults(db, season, raceId)
    .then((qualifyingData) => {
      if (qualifyingData[0]) {
        res.render('qualifying', {qualifyingData, raceName:qualifyingData[0].raceName})
      } else {
        res.render('no-laptime-data')
      }
    })
})

// display starting grid
router.get('/season/:id/:raceId/grid', (req, res) => {
  var db = req.app.get('db')
  var season = req.params.id
  var raceId = req.params.raceId
  dbFunctions.getGrid(db, raceId)
    .then((gridData) => {
      if (gridData[0]) {
        res.render('grid', {gridData, raceName:gridData[0].raceName, raceYear:gridData[0].year})
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
      .join('drivers', 'laptimes.driverId', '=', 'drivers.driverId')
      .orderBy('lap', 'asc')
      .then((laptimes) => {
        // let raceData = prepareRaceData(laptimes) // convert data into multi-dimensional array
        let raceData = functions.prepareRaceData(laptimes)
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
