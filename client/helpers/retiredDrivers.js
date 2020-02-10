export function findRetiredDrivers(lapData, results) {
  var retiredDriversArray = []

  // Find all drivers with result positionText of 'R'
  var driversWithR = results.filter((result) => {
    return result.positionText === 'R'
  })

  // Push retired driver object to retiredDriversArray
  driversWithR.map((retiredResult) => {
    retiredDriversArray.push({surname: retiredResult.surname, laps: retiredResult.laps, position: retiredResult.positionOrder})
  })

  // Sort retiredDriversArray by laps completed
  var sortedRetirees = retiredDriversArray.sort((a, b) => {
    if (a.laps >= b.laps) {
      return 1
    }
  })

  let retireesInOrder = []
  sortedRetirees.map((result) => {
    retireesInOrder.push(result)
  })
  return retireesInOrder
}

export function addRetiredLaps(lapData, retiredDrivers, currentLap) {

  // If driver has retired, add driver last lap to raceData
  let allRetiredDrivers = []
  retiredDrivers.forEach((driver) => {
    if (driver.laps < currentLap) {
      allRetiredDrivers.unshift(driver)
    }
  })

  allRetiredDrivers.forEach((driver) => {
    lapData.push(driver)
  })

  return lapData
}

export function driverDoesNotRetire (driver, retiredDrivers) {
  let hasDriverRetired = retiredDrivers.filter((retiredDriver) => {
    return driver == retiredDriver.surname
  })
  return (hasDriverRetired.length < 1) ? true : false
}

export function hasDriverRetiredYet (driver, retiredDrivers, currentLap) {
    // Find result of retired driver
    let driverResult = retiredDrivers.filter((retiredDriver) => {
      return driver == retiredDriver.surname
    })[0]

    // Return true if drivers completed laps are <= current race lap (if driver has retired)
    return(driverResult.laps <= currentLap)
  }
