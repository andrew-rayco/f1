// Remember, for inline styles use style={{marginRight: spacing + 'em'}} when using JSX
import React from 'react'
import { Link } from 'react-router-dom'

import * as api from '../api'
import * as hVis from '../helpers/visualisation'
import * as h from '../helpers/retiredDrivers'
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
    let allDrivers = hVis.getAllDriversInRace(this.state.raceData)
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

  nextRaceLink () {
    let location = this.props.location.pathname
    let pathArray = location.split('/')
    let season = pathArray[2]

    pathArray[3] = Number(pathArray[3]) + 1
    // console.log(`#/season/${season}/${pathArray[3]}/${pathArray[4]}`)
    return `/season/${season}/${pathArray[3]}/${pathArray[4]}`
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
    var retiredDrivers = h.findRetiredDrivers(lapData, this.state.results)

    // Add retired last laps to the lapData
    h.addRetiredLaps(lapData, retiredDrivers, this.state.lap)

    if (this.state.lap === this.state.maxLaps) {
      lapData = this.state.results
    }

    return lapData.map((driverLap, i) => {
      if (h.driverDoesNotRetire(driverLap.surname, retiredDrivers) || !h.hasDriverRetiredYet(driverLap.surname, retiredDrivers, this.state.lap)) {
        if (this.state.lap > this.state.maxLaps * .20) {
          return (
            <div key={i} className="driver">
              <div className={driverLap.surname, `driverBar`}>
                <div className="vis-color" style={{
                  width: this.calcWidth(driverLap.surname, this.state.winner.winningDriver, this.state.allDrivers) + '%'
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
                  width: this.calcWidth(driverLap.surname, this.state.winner.winningDriver, this.state.allDrivers) + '%'
                }}>&nbsp;</div>
              </div>
            </div>
          )
        }
      } else if (h.hasDriverRetiredYet(driverLap.surname, retiredDrivers, this.state.lap)) {
        if (driverLap.laps < this.state.maxLaps * .40) {
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
        } else {
          return (
            <div key={i} className="driver">
              <div className={'driverBar ' + driverLap.surname} ><div className="vis-color" style={{
                  width: (this.state.allDrivers[driverLap.surname] / totalRaceTime) * 100 + '%', backgroundColor: 'red'
                }}>{driverLap.position || driverLap.positionOrder}: {driverLap.surname} - Lap {driverLap.laps}</div>
              </div>
            </div>
          )
        }
      }
    })
  }

  render () {
    if (this.state.raceData) {
      return (
        <div className="race">
          <h2>{this.state.raceYear} {this.state.raceName}</h2>
          <button onClick={() => this.handleClick()}>Start visualisation</button>
          <p className="beta">This feature is in beta.</p>
          <h3>Lap {this.state.lap} of {this.state.maxLaps}</h3>
          {this.state.allDrivers ? this.showRace(this.state.raceData) : '<p>Loading...</p>'}
          {/* <p><Link to={this.nextRaceLink()}>Next Race</Link></p> */}
          <div className="more-from">
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
