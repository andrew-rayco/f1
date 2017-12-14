export function getAllDriversInRace(raceData) {
  var allDrivers = {}
  raceData.forEach((lap) => {
    if (allDrivers[lap.surname] === undefined) {
      allDrivers[lap.surname] = 0
    }
  })
  return allDrivers
}

export function calcWidth(driver, winner, allDrivers, totalRaceTime, maxLaps) {
  let winnersCurrentTime = allDrivers[winner]
  let driversCurrentTime = allDrivers[driver]
  let distanceFromWinner = findDistanceFromWinner(winnersCurrentTime, driversCurrentTime)

  if (driver == winner) {
    return (winnersCurrentTime / totalRaceTime * 100) + (winnersCurrentTime / totalRaceTime * 100 / maxLaps)
  } else {
    return ((winnersCurrentTime + distanceFromWinner) / totalRaceTime * 100) + ((winnersCurrentTime + distanceFromWinner) / totalRaceTime * 100 / maxLaps)
  }
}

function findDistanceFromWinner (winnerTime, driverTime) {
  return winnerTime - driverTime
}

export function getCurrentDriverLap (driver, lap, raceData) {
    var toFind = {lap: lap, surname: driver}
    var currentDriverLap = raceData.filter((lap) => {
      for(var key in toFind) {
        if(lap[key] !== toFind[key]) {
          return false
        }
      }
      return true
    })
    return currentDriverLap[0] || { milliseconds: 0 }
  }
