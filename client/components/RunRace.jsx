import React from 'react'

import * as api from '../api'
import * as visualise from '../visualisation'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.getAndSetRaceInfo()
    this.state = {
      lap: 0,
      visualIsRunning: false
    }
  }

  getAndSetRaceInfo() {
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

  setRaceDetails() {
    let allDrivers = visualise.getAllDriversInRace(this.state.raceData)
    let maxLaps = this.state.winner.laps

    this.setState({
      allDrivers,
      maxLaps
    })
  }


  showRace(data) {
    var winner = this.state.winner.winningDriver
    var totalRaceTime = this.state.winner.winningTime
    var totalRaceLaps = this.state.maxLaps
    let allDrivers = this.state.allDrivers
    let lapData = this.state.raceData.filter((lap) => {
      return lap.lap === this.state.lap
    })
    // Remember, for inline styles use style={{marginRight: spacing + 'em'}} when using JSX
    var retiredDrivers = this.findRetiredDrivers(lapData)

    // Collect last full laps of retired drivers (possibly do this before processing race)
    var driversWithR = this.state.results.filter((result) => {
      return result.positionText === 'R'
    })

    var retiredDriversLastLaps = []
    retiredDrivers.map((driver) => {
      var allDriverLaps = this.state.raceData.filter((lap) => {
        return lap.surname === driver
      })
      allDriverLaps[allDriverLaps.length - 1].retired = true
      retiredDriversLastLaps.push(allDriverLaps[allDriverLaps.length - 1])
    })
    retiredDriversLastLaps.map((retiredLap) => {
      lapData.push(retiredLap)
    })
    // lapData.retirees = retiredDriversLastLaps

    // console.log(lapData)
    // console.log(this.state.results)

    // try and figure out how to show retirees
    return lapData.map((driverLap, i) => {
      if (driverLap.lap == 70) {
        // console.log(this.state.lapData)
      }
      if (driverLap.retired !== true) {
        return (
          <div key={i} className="driver">
            <div className={driverLap.surname}>
              {driverLap.position}: {driverLap.surname}
              <div className="vis-color" style={{
                width: this.calcWidth(driverLap.surname, winner) + '%'
              }}>&nbsp;</div>
            </div>
          </div>
        )
      } else {
        let finalPosition = this.state.results.filter((result) => {
          return driverLap.driverId === result.driverId
        })[0]
        return (
          <div key={i} className="driver">
            <div className={driverLap.surname}>
              {finalPosition.positionOrder}: {driverLap.surname} - Lap {finalPosition.laps}
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

  findRetiredDrivers(lapData) {
    let driversArray = Object.keys(this.state.allDrivers)
    lapData.map((lap) => {
      if (driversArray.indexOf(lap.surname) > -1) {
        driversArray.splice(driversArray.indexOf(lap.surname), 1)
      }
    })
    // reorder driversArray into the order of retirements
    let orderedDriversArray = driversArray.map((driver) => {
      // console.log(driver)
    })
    return driversArray

  }

  calcWidth(driver, winner) {
    var totalRaceTime = this.state.winner.winningTime
    if (driver == winner) {
      return this.state.allDrivers[winner] / totalRaceTime * 100
    } else {
      return ((this.state.allDrivers[winner] + this.findDistanceFromWinner(driver, winner)) / totalRaceTime * 100)
    }
  }

  findDistanceFromWinner(driver, winner) {
    var totalRaceTime = this.state.winner.winningTime
    return this.state.allDrivers[winner] - this.state.allDrivers[driver]
  }

  getCurrentDriverLap(driver, lap) {
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

  handleClick() {
    if (this.state.visualIsRunning) {
      clearInterval(lapTicker)
      console.log('this should be working')
    } else {
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

      this.setState({visualIsRunning: !this.state.visualIsRunning})
    }
    // if !visualIsRunning, stop visualisation
    // else {
    //   clearInterval(lapTicker)
    //   console.log('this should stop the running')
    // }
  }

  render() {
    if (this.state.raceData) {
      return (
        <div className="race">
          <h2>{this.state.raceYear} {this.state.raceName}</h2>
          <button onClick={() => this.handleClick()}>Start visualisation</button>
          <h3>Lap {this.state.lap} of {this.state.maxLaps}</h3>
          {this.state.allDrivers ? this.showRace(this.state.RaceData) : '<p>Loading...</p>'}
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
