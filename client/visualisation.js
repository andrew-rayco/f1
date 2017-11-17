import React from 'react'

import RunRace from './components/RunRace'

function getAllDriversInRace(raceData) {
  var allDrivers = {}
  raceData.forEach((lap) => {
    if (allDrivers[lap.surname] === undefined) {
      allDrivers[lap.surname] = 0
    }
  })
  return allDrivers
}

function maxLapsInRace(raceData) {
  var maxLaps = 0;
  raceData.forEach((lap) => {
    if (lap.lap > maxLaps) {
      maxLaps = lap.lap
    }
  })
  return maxLaps
}

module.exports = {
  getAllDriversInRace,
  maxLapsInRace
}
