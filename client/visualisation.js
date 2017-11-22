export function getAllDriversInRace(raceData) {
  var allDrivers = {}
  raceData.forEach((lap) => {
    if (allDrivers[lap.surname] === undefined) {
      allDrivers[lap.surname] = 0
    }
  })
  return allDrivers
}

// Keep getting 'typeError' - is not a function
export function getCurrentDriverLap(driver, lap) {
  var toFind = {
    lap: lap,
    surname: driver
  }
  var currentDriverLap = this.state.raceData.filter((lap) => {
    for (var key in toFind) {
      if (lap[key] !== toFind[key]) {
        return false
      }
    }
    return true
  })
  return currentDriverLap[0] || {
    milliseconds: 0
  }
}
