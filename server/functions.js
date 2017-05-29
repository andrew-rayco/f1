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

  var count = 0;
  setInterval(function() {
    console.log(lapsByDriver[0][count].time)
    count++
  }, 100)

  return lapsByDriver
}

module.exports = {
  prepareRaceData
}
