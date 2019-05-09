var express = require('express')
var router = express.Router()
var moment = require('moment')

var dbFunctions = require('./db/db-functions')
var functions = require('./functions')
var apiRoutes = require('./apiRoutes')

router.get('/', (req, res) => {
    apiRoutes.getSeasons((seasons) => {
        let allSeasons = seasons.MRData.SeasonTable.Seasons
        let renamedSeasons = []
        allSeasons.map((season) => {
            renamedSeasons.push({
                year: season.season,
                url: season.url
            })
        })
        res.json(renamedSeasons)
    })
})


router.get('/circuits', (req, res) => {
    var db = req.app.get('db')
    db('circuits')
        .orderBy('country', 'asc')
        .then(function(circuits) {
            res.json(circuits)
        })
        .catch((err) => {
            res.status(500).send('DATABASE ERROR: ' + err.message)
        })
})

// show all races in selected season
router.get('/season/:id', (req, res) => {
    const year = req.params.id
    apiRoutes.getSingleSeason(year, (result) => {
        res.json(result)
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
                res.json({ qualifyingData, raceName: qualifyingData[0].raceName })
            } else {
                apiRoutes.getQualifying(season, req.headers.raceround, (data) => {
                    res.json(data)
                })
            }
        })
        .catch((err) => {
            res.status(500).send('DATABASE ERROR: ' + err.message)
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
                functions.sortGrid(gridData)
                res.json({ gridData, raceName: gridData[0].raceName, raceYear: gridData[0].year })
            } else {
                apiRoutes.getGrid(season, req.headers.raceround, (data) => {
                    functions.sortGrid(data.gridData)
                    res.json(data)
                })
            }
        })
        .catch((err) => {
            res.status(500).send('DATABASE ERROR: ' + err.message)
        })
})

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
                res.json(raceData)
            })
            .catch((err) => {
                res.status(500).send('DATABASE ERROR: ' + err.message)
            })
    } else {
        res.json({ noData: true })
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
                res.render('laptimes', { laptimes })
            })
    } else {
        res.render('no-laptime-data')
    }
})

// show race results
router.get('/season/:id/:raceId/results', (req, res) => {
    var db = req.app.get('db')
    var season = req.params.id
    var raceId = req.params.raceId
    dbFunctions.getRaceResults(db, season, raceId)
        .then((results) => {
            if (results[0]) {
                let newResults = functions.cleanResults(results)
                res.json(newResults)
            } else {
                apiRoutes.getResults(season, req.headers.raceround, (data) => {
                    res.json(data)
                })
            }
        })
        .catch((err) => {
            res.status(500).send('DATABASE ERROR: ' + err.message)
        })
})

// core race information (required mainly for headings of child components)
router.get('/season/:id/:raceId/race-details', (req, res) => {
    var db = req.app.get('db')
    var id = req.params.id
    var raceId = req.params.raceId
    dbFunctions.getRaceInfo(db, id, raceId)
        .then((results) => {
            res.json({ results })
        })
        .catch((err) => {
            res.status(500).send('DATABASE ERROR: ' + err.message)
        })
})

module.exports = router
