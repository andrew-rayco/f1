function prepareRaceData (laptimes) {


  // Get all driver Ids in race
  var driversInRace = []
  laptimes.map((lap) => {
    if (driversInRace.indexOf(lap.driverId) == -1) {
      driversInRace.push(lap.driverId)
    }
  })


  // list all laps by driver with id
  var lapsByDriver = []
  driversInRace.forEach((driver) => {
    lapsByDriver.push(laptimes.filter((lap) => {
      return lap.driverId === driver
    }))
  })

  // find maximum laps in race
  var maxLaps = 0;
  laptimes.map((lap) => {
    if (lap > maxLaps) {
      maxLaps = lap
    }
  })

  var count = 0;
  setInterval(function() {
    if (lapsByDriver[0][count].lap < 59) { // stop this crapping out when exceeding laps!
      console.log(lapsByDriver[0][count].lap)
      count++
    } else {
      console.log('race is over');
    }
  }, 50)

  return lapsByDriver
}

module.exports = {
  prepareRaceData
}
