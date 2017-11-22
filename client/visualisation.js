export function getAllDriversInRace(raceData) {
  var allDrivers = {}
  raceData.forEach((lap) => {
    if (allDrivers[lap.surname] === undefined) {
      allDrivers[lap.surname] = 0
    }
  })
  return allDrivers
}
