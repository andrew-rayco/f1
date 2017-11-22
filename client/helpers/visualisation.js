export function getAllDriversInRace(raceData) {
  var allDrivers = {}
  raceData.forEach((lap) => {
    if (allDrivers[lap.surname] === undefined) {
      allDrivers[lap.surname] = 0
    }
  })
  return allDrivers
}

export function calcWidth(driver, winner) {
  var totalRaceTime = this.state.winner.winningTime
  if (driver == winner) {
    return (this.state.allDrivers[winner] / totalRaceTime * 100) + (this.state.allDrivers[winner] / totalRaceTime * 100 / this.state.maxLaps)
  } else {
    return ((this.state.allDrivers[winner] + this.findDistanceFromWinner(driver, winner)) / totalRaceTime * 100) + ((this.state.allDrivers[winner] + this.findDistanceFromWinner(driver, winner)) / totalRaceTime * 100 / this.state.maxLaps)
  }
}
