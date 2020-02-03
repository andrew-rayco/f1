import moment from "moment"

export function getAllDriversInRace(results) {
    var allDrivers = {}
    results.forEach(lap => {
        const driver = lap.Driver
        if (allDrivers[driver.driverId] === undefined) {
            allDrivers[driver.driverId] = {
                surname: driver.familyName,
                firstName: driver.givenName,
                raceMilliseconds: 0
            }
        }
    })
    return allDrivers
}

export function calcWidth(driver, winner, allDrivers, totalRaceTime, maxLaps) {
    let winnersCurrentTime = allDrivers[winner]
    let driversCurrentTime = allDrivers[driver]
    let distanceFromWinner = findDistanceFromWinner(
        winnersCurrentTime,
        driversCurrentTime
    )

    if (driver == winner) {
        return (
            (winnersCurrentTime / totalRaceTime) * 100 +
            ((winnersCurrentTime / totalRaceTime) * 100) / maxLaps
        )
    } else {
        return (
            ((winnersCurrentTime + distanceFromWinner) / totalRaceTime) * 100 +
            (((winnersCurrentTime + distanceFromWinner) / totalRaceTime) *
                100) /
                maxLaps
        )
    }
}

function findDistanceFromWinner(winnerTime, driverTime) {
    return winnerTime - driverTime
}

// returns current driver lap in milliseconds to add to driver race total time
export function getCurrentDriverLap(driver, lap, raceData) {
    const thisLap = raceData.find(l => Number(l.number) == lap)
    const driverLap = thisLap.Timings.find(l => l.driverId === driver)
    console.log(driverLap)

    if (driverLap) {
        const laptime = driverLap.time

        // convert laptime to millseconds
        // Surely moment.js can convert "1:20.816" to milliseconds without needing this??
        const minSplit = laptime.split(":")
        const secSplit = minSplit[1].split(".")
        const minutes = minSplit[0]
        const seconds = secSplit[0]
        const milliseconds = secSplit[1]

        const lapInMilliseconds = moment
            .duration({
                minutes,
                seconds,
                milliseconds
            })
            .asMilliseconds()

        return { milliseconds: lapInMilliseconds }
    } else {
        return { milliseconds: 0 }
    }

    // "1:20.816"
    // this is the old way. Kept here because I'm not sure
    // why I was returning either the milliseconds or currentDriverLap[0]

    // var toFind = {
    //   lap: lap,
    //   surname: driver
    // }
    // var currentDriverLap = raceData.filter(lap => {
    //   for (var key in toFind) {
    //     if (lap[key] !== toFind[key]) {
    //       return false
    //     }
    //   }
    //   return true
    // })
    // return (
    //   currentDriverLap[0] || {
    //     milliseconds: 0
    //   }
    // )
}

export function buildLapData(raceData, maxLaps, thisLap, raceResults) {
    // Get data of all drivers for this current lap
    let lapData = raceData.filter(lap => {
        return lap.lap === thisLap
    })

    // Find drivers who have completed race (positionText is a number)
    let unretiredDrivers = raceResults.filter(result => {
        return parseInt(result.positionText) < 50
    })

    // Of those that finish race, find those that have been lapped
    let lappedDrivers = unretiredDrivers.filter(result => {
        return result.laps < maxLaps
    })

    // For each lapped driver, push driver final result to lapData if drivers completed laps is < current lap
    lappedDrivers.forEach(driver => {
        if (driver.laps < thisLap) {
            lapData.push(driver)
        }
    })

    return lapData
}
