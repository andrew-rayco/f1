let request = require("superagent")
let devData = require("../client/devData")

let functions = require("./functions")

const url = "http://ergast.com/api/f1/"

function getSeasons(callback) {
    request.get(`${url}seasons.json?limit=80`).end((err, result) => {
        if (err) {
            console.log(err)
        } else {
            callback(result.body.MRData.SeasonTable.Seasons)
        }
    })
}

function getSingleSeason(year, callback) {
    const urlConcat = `${url}${year}.json`
    request.get(urlConcat).end((err, result) => {
        if (!err) {
            const season = result.body.MRData.RaceTable.Races
            callback(season)
        } else {
            console.log(err)
        }
    })
}

function getCircuits(callback) {
    const urlConcat = `${url}circuits.json?limit=100`
    request.get(urlConcat).end((err, result) => {
        if (err) {
            console.log(err)
        } else {
            const circuits = result.body.MRData.CircuitTable.Circuits
            callback(circuits.sort(functions.compareCircuits))
        }
    })
}

function getGrid(season, raceRound, callback) {
    // e.g. http://ergast.com/api/f1/2017/15/results.json
    request
        .get(url + season + "/" + raceRound + "/results.json?limit=60")
        .end((err, result) => {
            if (err) {
                console.log(err)
            } else {
                let data = result.body.MRData.RaceTable.Races[0]
                if (data) {
                    let strippedResults = []
                    data.Results.map(result => {
                        // Take only what we need from each result and add to strippedResults
                        strippedResults.push({
                            grid: result.grid,
                            driverUrl: result.Driver.url,
                            forename: result.Driver.givenName,
                            surname: result.Driver.familyName,
                            constructorUrl: result.Constructor.url,
                            constructorName: result.Constructor.name
                        })
                    })

                    const sortedResults = functions.sortGrid(strippedResults)

                    let cleanData = {
                        raceName: data.raceName,
                        year: data.season,
                        gridData: sortedResults
                    }

                    callback(cleanData)
                } else {
                    callback({ noData: true })
                }
            }
        })
}

function getQualifying(season, raceRound, callback) {
    // e.g. http://ergast.com/api/f1/2017/10/qualifying.json
    request
        .get(url + season + "/" + raceRound + "/qualifying.json?limit=60")
        .end((err, result) => {
            if (err) {
                console.log(err)
            } else {
                let data = result.body.MRData.RaceTable.Races[0]
                if (data) {
                    let qualiResults = []
                    data.QualifyingResults.map(result => {
                        qualiResults.push({
                            position: result.position,
                            driverUrl: result.Driver.url,
                            forename: result.Driver.givenName,
                            surname: result.Driver.familyName,
                            constructorUrl: result.Constructor.url,
                            constructorName: result.Constructor.name,
                            q1: result.Q1,
                            q2: result.Q2,
                            q3: result.Q3
                        })
                    })

                    let cleanQualiData = {
                        raceName: data.raceName,
                        year: data.season,
                        qualifyingData: qualiResults
                    }

                    callback(cleanQualiData)
                } else {
                    callback({ noData: true })
                }
            }
        })
}

function getResults(season, raceRound, callback) {
    // e.g. http://ergast.com/api/f1/2017/15/results.json
    request
        .get(`${url}${season}/${raceRound}/results.json`)
        .end((err, result) => {
            if (err) {
                console.log(err)
            } else {
                let data = result.body.MRData.RaceTable.Races[0]
                if (data) {
                    let resultData = []
                    data.Results.map(result => {
                        const {
                            position,
                            Driver,
                            Constructor,
                            Time,
                            status,
                            FastestLap,
                            positionText,
                            laps
                        } = result
                        resultData.push({
                            position: position,
                            driverUrl: Driver.url,
                            forename: Driver.givenName,
                            surname: Driver.familyName,
                            constructorUrl: Constructor.url,
                            constructorName: Constructor.name,
                            raceTime: Time ? Time.time : status,
                            laps: laps,
                            fastestLapTime: FastestLap
                                ? FastestLap.Time.time
                                : "-",
                            fastestLapSpeed: FastestLap
                                ? FastestLap.AverageSpeed.speed
                                : null,
                            fastestLapNumber: FastestLap
                                ? FastestLap.lap
                                : null,
                            status: status,
                            positionText: positionText
                        })
                    })

                    let cleanResultsData = {
                        raceYear: season,
                        raceName: data.raceName,
                        results: resultData
                    }
                    callback(cleanResultsData)
                } else {
                    callback({ noData: true })
                }
            }
        })
    // request
    //   .get(url + season + '/' + raceRound + '/results.json?limit=60')
    //   .end((err, result) => {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       let data = result.body.MRData.RaceTable.Races[0]
    //       if (data) {
    //         let resultData = []
    //         data.Results.map(result => {
    //           const {
    //             position,
    //             Driver,
    //             Constructor,
    //             Time,
    //             status,
    //             FastestLap,
    //             positionText,
    //             laps
    //           } = result
    //           resultData.push({
    //             position: position,
    //             driverUrl: Driver.url,
    //             forename: Driver.givenName,
    //             surname: Driver.familyName,
    //             constructorUrl: Constructor.url,
    //             constructorName: Constructor.name,
    //             raceTime: Time ? Time.time : status,
    //             laps: laps,
    //             fastestLapTime: FastestLap ? FastestLap.Time.time : '-',
    //             fastestLapSpeed: FastestLap
    //               ? FastestLap.AverageSpeed.speed
    //               : null,
    //             fastestLapNumber: FastestLap ? FastestLap.lap : null,
    //             status: status,
    //             positionText: positionText
    //           })
    //         })

    //         let cleanResultsData = {
    //           raceYear: season,
    //           raceName: data.raceName,
    //           results: resultData
    //         }

    //         callback(cleanResultsData)
    //       } else {
    //         callback({ noData: true })
    //       }
    //     }
    //   })

    callback(devData.results)
}

function getVisData(season, raceRound, callback) {
    // e.g. https://ergast.com/api/f1/2011/5/laps.json
    // request
    //     .get(`${url}${season}/${raceRound}/laps.json?limit=2000`)
    //     .end((err, result) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             const data = result.body.MRData.RaceTable.Races[0].Laps
    //             callback(data)
    //         }
    //     })

    // temp data to not kill the api (and avoid wait times in development)
    callback(devData.raceData)
}

function getRaceDetails(season, raceRound, callback) {
    // e.g. http://ergast.com/api/f1/2019/7/results.json
    request
        .get(`${url}${season}/${raceRound}/results.json`)
        .end((err, result) => {
            if (err) {
                console.log(err)
            } else {
                callback(result.body.MRData.RaceTable.Races[0])
            }
        })
}

module.exports = {
    getSeasons,
    getSingleSeason,
    getCircuits,
    getGrid,
    getQualifying,
    getResults,
    getVisData,
    getRaceDetails
}
