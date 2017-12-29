// part of the great api experiment of 1 July, 2017
// var express = require('express')
// var router = express.Router()

let request = require('superagent')

const url = 'http://ergast.com/api/f1/'

function getData(callback) {
  console.log('hitting the api call')
  request
    .get('http://ergast.com/api/f1/seasons.json')
    .end((err, result) => {
      if(err) {
        console.log(err)
      } else {
        // console.log(result.body)
        callback(result.body)
      }
  })
}

function getGrid(season, raceRound, callback) {
  console.log('hitting the api call')
  // e.g. http://ergast.com/api/f1/2017/15/results
  request
    .get(url + season + '/' + raceRound + '/results.json?limit=60')
    .end((err, result) => {
      if(err) {
        console.log(err)
      } else {
        let data = result.body.MRData.RaceTable.Races[0]
        let strippedResults = []
        data.Results.map((result) => {
          // Take only what we need from each result and add to strippedResults
          strippedResults.push({
            grid: result.grid,
            driverUrl: result.Driver.url,
            forename: result.Driver.givenName,
            surname: result.Driver.familyName,
            constructorUrl: result.Constructor.url,
            constructorName: result.Constructor.name
          })
        })

        function compareGridPos(a, b) {
          const gridA = Number(a.grid)
          const gridB = Number(b.grid)

          let comparison = 0
          if (gridA > gridB) {
            comparison = 1
          } else {
            comparison = -1
          }
          return comparison
        }

        strippedResults.sort(compareGridPos)

        let cleanData = {
          raceName: data.raceName,
          year: data.season,
          gridData: strippedResults
        }

        callback(cleanData)
      }
  })
}

module.exports = {
  getData,
  getGrid
}
