// Remember, for inline styles use style={{marginRight: spacing + 'em'}} when using JSX
import React from 'react'

import * as api from '../api'
import * as visualise from '../visualisation'
import RaceOptions from './RaceOptions'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.getAndSetRaceInfo()
    this.state = {
      lap: 1,
      visualIsRunning: false
    }
  }

  getAndSetRaceInfo () {
    let location = this.props.location.pathname
    let pathArray = location.split('/')
    let season = pathArray[2]
    let raceId = pathArray[3]
    api.getRaceDetails(season, raceId, (raceInfo) => {
      let raceWinner = raceInfo.results.filter((result) => {
        return result.position === 1
      })[0]
      this.setState({
        raceName: raceInfo.results[0].name,
        raceYear: raceInfo.results[0].year,
        results: raceInfo.results,
        winner: {
          winningDriver: raceWinner.surname,
          driverId: raceWinner.driverId,
          winningTime: raceWinner.milliseconds,
          laps: raceWinner.laps
         }
      })
    })

    api.getVisData (season, raceId, (raceData) => {
      this.setState({ raceData })
      this.setRaceDetails()
    })
  }

  setRaceDetails () {
    let allDrivers = visualise.getAllDriversInRace(this.state.raceData)
    let maxLaps = this.state.winner.laps

    this.setState({
      allDrivers,
      maxLaps
    })
  }

  getAndSetRaceInfo () {
    let location = this.props.location.pathname
    let pathArray = location.split('/')
    let season = pathArray[2]
    let raceId = pathArray[3]
    api.getRaceDetails(season, raceId, (raceInfo) => {
      let raceWinner = raceInfo.results.filter((result) => {
        return result.position === 1
      })[0]
      this.setState({
        raceName: raceInfo.results[0].name,
        raceYear: raceInfo.results[0].year,
        results: raceInfo.results,
        winner: {
          winningDriver: raceWinner.surname,
          driverId: raceWinner.driverId,
          winningTime: raceWinner.milliseconds,
          laps: raceWinner.laps
         }
      })
    })

    api.getVisData(season, raceId, (raceData) => {
      this.setState({ raceData })
      this.setRaceDetails()
    })
  }

  setRaceDetails () {
    let allDrivers = visualise.getAllDriversInRace(this.state.raceData)
    let maxLaps = this.state.winner.laps

    this.setState({
      allDrivers,
      maxLaps
    })
  }


  showRace (data) {
    var winner = this.state.winner.winningDriver
    var totalRaceTime = this.state.winner.winningTime
    var totalRaceLaps = this.state.maxLaps
    let allDrivers = this.state.allDrivers
    let lapData = this.state.raceData.filter((lap) => {
      return lap.lap === this.state.lap
    })


    // DEAL WITH LAPPED DRIVERS
    // 1. Find drivers where result.positionText != 'R'
    let unretiredDrivers = this.state.results.filter((result) => {
      return result.positionText != 'R'
    })
    let lappedDrivers = unretiredDrivers.filter((result) => {
      return result.laps < this.state.maxLaps
    })
    lappedDrivers.forEach((driver) => {
      if (driver.laps < this.state.lap) {
        lapData.push(driver)
      }
    }) + 1
    var retiredDrivers = this.findRetiredDrivers(lapData)

    // Add retired last laps to the lapData
    this.addRetiredLaps(lapData, retiredDrivers)

    if (this.state.lap === this.state.maxLaps) {
      lapData = this.state.results
    }

    console.log(lapData)

    return lapData.map((driverLap, i) => {
      if (this.driverDoesNotRetire(driverLap.surname, retiredDrivers) || !this.hasDriverRetiredYet(driverLap.surname, retiredDrivers)) {
        if (this.state.lap > this.state.maxLaps * .20) {
          return (
            <div key={i} className="driver">
              <div className={driverLap.surname, `driverBar`}>
                <div className="vis-color" style={{
                  width: this.calcWidth(driverLap.surname, winner) + '%'
                }}>{driverLap.position || driverLap.positionText}: {driverLap.surname}</div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={i} className="driver">
              <div className={driverLap.surname, `driverBar`}>
                {driverLap.position || driverLap.positionText}: {driverLap.surname}
                <div className="vis-color" style={{
                  width: this.calcWidth(driverLap.surname, winner) + '%'
                }}>&nbsp;</div>
              </div>
            </div>
          )
        }
      } else if (this.hasDriverRetiredYet(driverLap.surname, retiredDrivers)) {
        return (
          <div key={i} className="driver">
            <div className={'driverBar ' + driverLap.surname} >
              {driverLap.position || driverLap.positionOrder}: {driverLap.surname} - Lap {driverLap.laps}
              <div className="vis-color" style={{
                width: (this.state.allDrivers[driverLap.surname] / totalRaceTime) * 100 + '%', backgroundColor: 'red'
              }}>&nbsp;</div>
            </div>
          </div>
        )
      }
      // else if no driver.lap matching this, show the driver.lap with the highest lap number. Or better still, show their accumulated race time
    })
  }

  addRetiredLaps (lapData, retiredDrivers) {
    // Find drivers who do not complete first lap, sorted by position
    let driversDoNotCompleteFirstLap = retiredDrivers.filter((result) => {
      return result.laps == 0
    }).sort((a, b) => {
      if (a.laps >= b.laps) {
        return 1
      }
    })

    // If driver has retired, add to raceData
    let allRetiredDrivers = []
    retiredDrivers.forEach((driver) => {
      if (driver.laps <= this.state.lap) {
        allRetiredDrivers.unshift(driver)
      }
    })

    allRetiredDrivers.forEach((driver) => {
      lapData.push(driver)
    })
  }

  driverDoesNotRetire (driver, retiredDrivers) {
    let hasDriverRetired = retiredDrivers.filter((retiredDriver) => {
      return driver == retiredDriver.surname
    })
    return (hasDriverRetired.length < 1) ? true : false
  }

  hasDriverRetiredYet (driver, retiredDrivers) {
    // Find result of retired driver
    let driverResult = retiredDrivers.filter((retiredDriver) => {
      return driver == retiredDriver.surname
    })[0]

    // Return true if drivers completed laps are <= current race lap (if driver has retired)
    return(driverResult.laps <= this.state.lap)
  }

  findRetiredDrivers (lapData) {
    var driversWithR = this.state.results.filter((result) => {
      return result.positionText === 'R'
    })
    var retiredDriversArray = []
    driversWithR.map((retiredResult) => {
      retiredDriversArray.push({
        surname: retiredResult.surname,
        laps: retiredResult.laps,
        position: retiredResult.positionOrder
      })
    })

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


  calcWidth (driver, winner) {
    var totalRaceTime = this.state.winner.winningTime
    if (driver == winner) {
      return (this.state.allDrivers[winner] / totalRaceTime * 100) + (this.state.allDrivers[winner] / totalRaceTime * 100 / this.state.maxLaps)
    } else {
      return ((this.state.allDrivers[winner] + this.findDistanceFromWinner(driver, winner)) / totalRaceTime * 100) + ((this.state.allDrivers[winner] + this.findDistanceFromWinner(driver, winner)) / totalRaceTime * 100 / this.state.maxLaps)
    }
  }

  findDistanceFromWinner (driver, winner) {
    var totalRaceTime = this.state.winner.winningTime
    return this.state.allDrivers[winner] - this.state.allDrivers[driver]
  }

  getCurrentDriverLap (driver, lap) {
    var toFind = {lap: this.state.lap, surname: driver}
    var currentDriverLap = this.state.raceData.filter((lap) => {
      for(var key in toFind) {
        if(lap[key] !== toFind[key]) {
          return false
        }
      }
      return true
    })
    return currentDriverLap[0] || { milliseconds: 0 }
  }

  handleClick () {
    if (this.state.visualIsRunning) {
      clearInterval(lapTicker)
      console.log('this should be working')
    } else {
      this.setState({visualIsRunning: true})
      var lapTicker = setInterval(() => {
        if (this.state.lap < this.state.maxLaps) {
          var newAllDrivers = {}
          for (var key in this.state.allDrivers) {
            var currentDriverLap = this.getCurrentDriverLap(key, this.state.lap)
            newAllDrivers[key] = this.state.allDrivers[key] + currentDriverLap.milliseconds
          }
          this.setState({
            allDrivers: newAllDrivers,
            lap: this.state.lap + 1
          })
        } else {
          clearInterval(lapTicker)
        }
      }, 150)

    }
  }

  nextRaceLink () {
    let location = this.props.location.pathname
    let pathArray = location.split('/')
    let season = pathArray[2]

    pathArray[3] = Number(pathArray[3]) + 1
    // console.log(`#/season/${season}/${pathArray[3]}/${pathArray[4]}`)
    return `/season/${season}/${pathArray[3]}/${pathArray[4]}`
  }

  render () {
    if (this.state.raceData) {
      return (
        <div className="race">
          <h2>{this.state.raceYear} {this.state.raceName}</h2>
          <button onClick={() => this.handleClick()}>Start visualisation</button>
          <h3>Lap {this.state.lap} of {this.state.maxLaps}</h3>
          {this.state.allDrivers ? this.showRace(this.state.RaceData) : '<p>Loading...</p>'}
          <p><a href={this.nextRaceLink()}>Next Race</a></p>
          <div>
            <RaceOptions key={this.state.results[0].raceId} props={this.state.results[0]} intro='More from' />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          Sorry. Visualisation isn't possible for this event. <br/>
          This feature needs data that only started becoming available mid-2011.
        </div>
      )
    }
  }
}

export default RunRace
