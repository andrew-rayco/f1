function prepareRaceData(laptimes) {
  // Get all driver Surnames in race
  var driversInRace = []
  laptimes.map(lap => {
    if (driversInRace.indexOf(lap.surname) == -1) {
      driversInRace.push(lap.surname)
    }
  })

  // list all laps by driver with id
  var lapsByDriver = []
  driversInRace.forEach(driver => {
    lapsByDriver.push(
      laptimes.filter(lap => {
        return lap.surname === driver
      })
    )
  })

  // find maximum laps in race
  var maxLaps = 0
  laptimes.forEach(lap => {
    if (lap.lap > maxLaps) {
      maxLaps = lap.lap
    }
  })

  // list all laps by lap number
  // Currently not being used......
  var lapsByLapNumber = []
  var count = 1
  for (i = 1; i <= maxLaps; i++) {
    lapsByLapNumber.push(
      laptimes.filter(thisLap => {
        return thisLap.lap === count
      })
    )
    count++
  }

  var cleanRaceData = []
  lapsByLapNumber.map(lap => {
    for (var i = 0; i < maxLaps; i++) {
      if (lap[i]) {
        cleanRaceData.push({
          driverId: lap[i].driverId,
          lap: lap[i].lap,
          surname: lap[i].surname,
          time: lap[i].time,
          milliseconds: lap[i].milliseconds,
          position: lap[i].position
        })
      }
    }
  })

  var count = 1
  var lapCounter = setInterval(function() {
    if (count <= maxLaps) {
      count++
      return count
    } else {
      clearInterval(lapCounter)
    }
  }, 50)

  return cleanRaceData
}

// Add human friendly classification titles
function cleanResults(results) {
  let newResults = [...results]
  newResults.forEach(result => {
    switch (result.positionText) {
      case 'R':
        result.position = result.positionOrder
        break
      case 'W':
        result.position = 'Withdrawn'
        break
      case 'D':
        result.position = 'Disqualified'
        break
      case 'E':
        result.position = 'Excluded'
        break
      case 'F':
        result.position = 'Failed to Qualify'
        break
      case 'N':
        result.position = 'Not Classified'
        break
      default:
        break
    }
  })

  let finalResults = {
    raceName: newResults[0].raceName,
    raceYear: newResults[0].raceYear,
    results: newResults
  }

  return finalResults
}

// Re-sort so grid entry of 0 (for DNQ or similar) aren't first in list
function sortGrid(gridData) {
  gridData.map(result => {
    if (result.grid == 0) {
      result.grid = 99
    }
  })
  gridData.sort(compareGridPos)
  gridData.map(result => {
    if (result.grid == 99) {
      result.grid = 'Pit'
    }
  })
  return gridData
}

function compareGridPos(a, b) {
  const gridA = Number(a.grid)
  const gridB = Number(b.grid)

  let comparison = 0
  if (gridA > gridB) {
    comparison = 1
  } else if (gridA < gridB) {
    comparison = -1
  }
  return comparison
}

// Comparison function to aid in sorting circuit list by country
function compareCircuits(a, b) {
  const aCountry = a.Location.country
  const bCountry = b.Location.country
  if (aCountry < bCountry) {
    return -1
  }
  if (aCountry > bCountry) {
    return 1
  }
  return 0
}

module.exports = {
  prepareRaceData,
  cleanResults,
  sortGrid,
  compareCircuits
}
