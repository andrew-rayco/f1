var express = require('express')
var router = express.Router()
var moment = require('moment')

var dbFunctions = require('./db/db-functions')
var functions = require('./functions')

router.get('/', (req, res) => {
  var db = req.app.get('db')
  db('seasons')
    .orderBy('year', 'asc')
    .then((seasons) => {
      res.json(seasons)
    })
    .catch((err) => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})


router.get('/circuits', (req, res) => {
  var db = req.app.get('db')
  db('circuits')
    .orderBy('country', 'asc')
    .then(function(circuits) {
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
        res.render('season', {season: season, clicked: function handleClick(e) {
          console.log(e.target)
        }})
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

// react route - Use this for race visualisation!
// make the race happen!
router.get('/season/:id/:raceId/visualise', (req, res) => {
  var db = req.app.get('db')
  var id = req.params.id
  var raceId = req.params.raceId
  if (raceId < 972 && raceId > 840) {
    dbFunctions.visualise(db, id, raceId)
      .then((laptimes) => {
        // let raceData = prepareRaceData(laptimes) // convert data into multi-dimensional array
        let raceData = functions.prepareRaceData(laptimes)
        res.render('react', {raceData: JSON.stringify(raceData)})
      })
  } else {
    res.render('no-laptime-data')
  }
})

// show all laptimes
router.get('/season/:id/:raceId/laptimes', (req, res) => {
  var db = req.app.get('db')
  var id = req.params.id
  var raceId = req.params.raceId
  if (raceId < 972 && raceId > 840) {
    dbFunctions.getAllLaptimes(db, id, raceId)
      .then((laptimes) => {
        // let raceData = prepareRaceData(laptimes) // convert data into multi-dimensional array
        let raceData = functions.prepareRaceData(laptimes)
        res.render('laptimes', {laptimes})
      })
  } else {
    res.render('no-laptime-data')
  }
})

// show race results
router.get('/season/:id/:raceId/results', (req, res) => {
  var db = req.app.get('db')
  var id = req.params.id
  var raceId = req.params.raceId
    dbFunctions.getRaceResults(db, id, raceId)
    .then((results) => {
      // console.log(results);
      let newResults = functions.cleanResults(results)
      res.render('result', {results: newResults})
    })
})


module.exports = router
