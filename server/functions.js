function prepareRaceData (laptimes) {

  // Get all driver Ids in race
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

  // Only take driver surname, lap num, time and milliseconds
  var cleanRaceData = []
  lapsByDriver.map((lap) => {
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
      // console.log(lapsByDriver[0][count].lap)
      count++
      return count
    } else {
      // console.log('race is over');
      clearInterval(lapCounter)
    }
  }, 50)

  return cleanRaceData
}

function cleanResults(results) {
  var newResults = results.forEach((result) => {
    if (result.position == '') {
      result.position = 99
    }
  })
  return newResults
}


module.exports = {
  prepareRaceData,
  cleanResults
}
