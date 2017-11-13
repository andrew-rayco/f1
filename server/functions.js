function prepareRaceData (laptimes) {

  // Get all driver Surnames in race
  var driversInRace = []
  laptimes.map((lap) => {
    if (driversInRace.indexOf(lap.surname) == -1) {
      driversInRace.push(lap.surname)
    }
  })

  // list all laps by driver with id
  var lapsByDriver = []
  driversInRace.forEach((driver) => {
    lapsByDriver.push(laptimes.filter((lap) => {
      return lap.surname === driver
    }))
  })


  // find maximum laps in race
  var maxLaps = 0;
  laptimes.forEach((lap) => {
    if (lap.lap > maxLaps) {
      maxLaps = lap.lap
    }
  })

  // list all laps by lap number
  // Currently not being used......
  var lapsByLapNumber = []
  var count = 1
  for (i = 1; i <= maxLaps; i++) {
    lapsByLapNumber.push(laptimes.filter((thisLap) => {
      return thisLap.lap === count
    }))
    count++
  }

  // Only take driver surname, lap num, time and milliseconds
  var cleanRaceData = []
  lapsByLapNumber.map((lap) => {
    // console.log(lap[0].surname);
    for (var i = 0; i < maxLaps; i++) {
      if (lap[i]) {
        cleanRaceData.push({
          lap: lap[i].lap,
          surname: lap[i].surname,
          time: lap[i].time,
          milliseconds: lap[i].milliseconds,
          position: lap[i].position
        })
      }
    }

  })

  //experimenting
  var count = 1;
  var lapCounter = setInterval(function() {
    if (count <= maxLaps) {
      // console.log(count)
      count++
      return count
    } else {
      // console.log('race is over');
      clearInterval(lapCounter)
    }
  }, 50)

  return cleanRaceData
}

// Add human friendly classification titles and ensure classified runners are
// listed ahead of others in results table
function cleanResults(results) {
  let newResults = [...results]
  newResults.forEach((result) => {
    switch (result.positionText) {
      case "R":
        result.position = 'Retired'
        break
      case "W":
        result.position = 'Withdrawn'
        break
      case "D":
        result.position = 'Disqualified'
        break
      case "E":
        result.position = 'Excluded'
        break
      case "F":
        result.position = 'Failed to Qualify'
        break
      case "N":
        result.position = 'Not Classified'
        break
      default:
        break
    }
  })

  // create array of finished drivers
  let finishedResults = newResults.filter((result) => {
    return (typeof result.position == 'number')
  })

  // create array of drivers who failed to finish
  let dnfResults = results.filter((result) => {
    return (typeof result.position == 'string')
  })

  // combine two above arrays with unclassified drivers after classified drivers
  return finishedResults.concat(dnfResults)
}


module.exports = {
  prepareRaceData,
  cleanResults
}
