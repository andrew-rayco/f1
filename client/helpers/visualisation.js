export function getAllDriversInRace(raceData) {
  var allDrivers = {}
  raceData.forEach(lap => {
    if (allDrivers[lap.surname] === undefined) {
      allDrivers[lap.surname] = 0
    }
  })
  return allDrivers
}

export function calcWidth(driver, winner, allDrivers, totalRaceTime, maxLaps) {
  let winnersCurrentTime = allDrivers[winner]
  let driversCurrentTime = allDrivers[driver]
  let distanceFromWinner = findDistanceFromWinner(
    winnersCurrentTime,
    driversCurrentTime
  )

  if (driver == winner) {
    return (
      (winnersCurrentTime / totalRaceTime) * 100 +
      ((winnersCurrentTime / totalRaceTime) * 100) / maxLaps
    )
  } else {
    return (
      ((winnersCurrentTime + distanceFromWinner) / totalRaceTime) * 100 +
      (((winnersCurrentTime + distanceFromWinner) / totalRaceTime) * 100) /
        maxLaps
    )
  }
}

function findDistanceFromWinner(winnerTime, driverTime) {
  return winnerTime - driverTime
}

export function getCurrentDriverLap(driver, lap, raceData) {
  var toFind = {
    lap: lap,
    surname: driver
  }
  var currentDriverLap = raceData.filter(lap => {
    for (var key in toFind) {
      if (lap[key] !== toFind[key]) {
        return false
      }
    }
    return true
  })
  return (
    currentDriverLap[0] || {
      milliseconds: 0
    }
  )
}

export function buildLapData(raceData, maxLaps, thisLap, raceResults) {
  // Get data of all drivers for this current lap
  let lapData = raceData.filter(lap => {
    return lap.lap === thisLap
  })

  // Find drivers who have completed race (positionText is a number)
  let unretiredDrivers = raceResults.filter(result => {
    return parseInt(result.positionText) < 50
  })

  // Of those that finish race, find those that have been lapped
  let lappedDrivers = unretiredDrivers.filter(result => {
    return result.laps < maxLaps
  })

  // For each lapped driver, push driver final result to lapData if drivers completed laps is < current lap
  lappedDrivers.forEach(driver => {
    if (driver.laps < thisLap) {
      lapData.push(driver)
    }
  })

  return lapData
}
