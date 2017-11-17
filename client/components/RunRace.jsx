import React from 'react'

import * as api from '../api'
import * as visualise from '../visualisation'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lap: 1,
      visualIsRunning: false
    }
  }

  componentWillMount() {
    let location = this.props.location.pathname
    let pathArray = location.split('/')
    let season = pathArray[2]
    let raceId = pathArray[3]
    api.getRaceDetails(season, raceId, (raceInfo) => {
      this.setState({
        raceName: raceInfo.results[0].name,
        raceYear: raceInfo.results[0].year
      })
    })

    api.getVisData(season, raceId, (raceData) => {
      this.setState({raceData})
      this.setRaceDetails()
    })
  }

  setRaceDetails() {
    let allDrivers = visualise.getAllDriversInRace(this.state.raceData)

    this.setState({
      allDrivers,
      winner: this.findWinnerSurname(),
      maxLaps: this.maxLapsInRace()
    })
  }

  // calculate total race laps
  maxLapsInRace() {
    var maxLaps = 0;
    this.state.raceData.forEach((lap) => {
      if (lap.lap > maxLaps) {
        maxLaps = lap.lap
      }
    })
    return maxLaps
  }

  findWinnerSurname() {
    var winner
    var finalLaps = this.state.raceData.filter((lap) => {
      return lap.lap === this.maxLapsInRace()
    })
    winner = finalLaps.filter((lap) => {
      return lap.position === 1
    })[0].surname

    return winner
  }

  // calculate total race time for winner (milliseconds)
  winnerTotalRaceTime() {
    var winningTime = 0
    var winner = this.findWinnerSurname()

    // Calculate total winner race time
    this.state.raceData.forEach((lap) => {
      if (lap.surname == winner) {
        winningTime += lap.milliseconds
      }
    })
    return winningTime
  }

  showRace(data) {
    var winner = this.findWinnerSurname()
    var totalRaceTime = this.winnerTotalRaceTime()
    var totalRaceLaps = this.maxLapsInRace()
    let allDrivers = this.state.allDrivers
    let lapData = this.state.raceData.filter((lap) => {
      return lap.lap === this.state.lap
    })
    // Remember, for inline styles use style={{marginRight: spacing + 'em'}} when using JSX
    var retiredDrivers = this.findRetiredDrivers(lapData)

    // Collect last full laps of retired drivers (possibly do this before processing race)
    var retiredDriversLastLaps = {}
    retiredDrivers.map((driver) => {
      var allDriverLaps = this.state.raceData.filter((lap) => {
        return lap.surname === driver
      })
      retiredDriversLastLaps[driver] = allDriverLaps[allDriverLaps.length - 1]
    })
    lapData.retirees = retiredDriversLastLaps

    // console.log(lapData)

    // try and figure out how to show retirees
    return lapData.map((driverLap, i) => {
      if (Object.values(lapData.retirees).length == 0) {
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
        return (
          <div key={i} className="driver">
            <div className={driverLap.surname}>
              {driverLap.position}: {driverLap.surname}
              <div className="vis-color" style={{
                width: this.calcWidth(driverLap.surname, winner) + '%', backgroundColor: 'red'
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
    return driversArray
    // console.log(Object.keys(this.state.allDrivers))
    // console.log(lapData[0])
  }

  calcWidth(driver, winner) {
    if (driver == winner) {
      return this.state.allDrivers[winner] / this.winnerTotalRaceTime() * 100
    } else {
      return ((this.state.allDrivers[winner] + this.findDistanceFromWinner(driver, winner)) / this.winnerTotalRaceTime() * 100)
    }
  }

  findDistanceFromWinner(driver, winner) {
    var totalRaceTime = this.winnerTotalRaceTime()
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
    if (!this.state.visualIsRunning) {

      var lapTicker = setInterval(() => {
        if (this.state.lap < this.maxLapsInRace()) {
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
