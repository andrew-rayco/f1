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
  }) // make this return driver names instead of driverId

  // find maximum laps in race
  var maxLaps = 0;
  laptimes.map((lap) => {
    if (lap.lap > maxLaps) {
      maxLaps = lap.lap
    }
  })

  var count = 0;
  var lapCounter = setInterval(function() {
    if (count < maxLaps) {
      console.log(lapsByDriver[0][count].lap)
      count++
      return count
    } else {
      console.log('race is over');
      clearInterval(lapCounter)
    }
    console.log(driversInRace);
  }, 50)


  return lapsByDriver



}


module.exports = {
  prepareRaceData
}
