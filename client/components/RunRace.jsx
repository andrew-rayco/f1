import React from 'react'

import * as api from '../api'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lap: 1,
      sortedLaps: [], // All laptimes for current lap
      count: 1,
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
    })
  }

  // calculate total race laps so setInterval knows when to stop
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

  // calculate total race time for winner
  winnerTotalRaceTime() {
    var winningTime = 0 // milliseconds
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
    var lapIncrementPercent = this.calculateProgressBar(totalRaceTime, totalRaceLaps)
    let lapData = this.state.raceData
    return lapData.map((driverLap, i) => {
      if (driverLap.lap == this.state.count) {
        return (
          <div key={i} className="driver">
            <div className={driverLap.surname}>
              {driverLap.position}: {driverLap.surname}: {driverLap.time}
              <div className="vis-color" style={{
                width: this.calcWidth(driverLap.surname, lapIncrementPercent, winner) + '%'
              }}>&nbsp;</div>
            </div>
          </div>
        )
      }
    })
  }

  // Remember, for inline styles use style={{marginRight: spacing + 'em'}} when using JSX

  calculateProgressBar(totalRaceTime, totalRaceLaps) {
    var singleLap = 100 / totalRaceLaps
    return singleLap // % of progress bar movement per lap (for race winner)
  }

  calcWidth(driver, lapIncrementPercent, winner) {
    var randomNum = Math.floor(Math.random() * 1.5 + 1)
    var groundCovered = lapIncrementPercent * this.state.lap
    if (driver == winner) {
      return groundCovered
    } else {
      return this.findDistanceFromWinner(driver, winner)
    }
  }

  findDistanceFromWinner(driver, winner) {
    var totalRaceTime = this.winnerTotalRaceTime()
    var toFind = {lap: this.state.lap, surname: driver}

    var currentDriverLap = this.state.raceData.filter((lap) => {
      for(var key in toFind) {
        if(lap[key] !== toFind[key]) {
          return false
        }
      }
      return true
    })
    console.log(currentDriverLap[0].surname, currentDriverLap[0].milliseconds)
  }

  handleClick() {
    var lapTicker = setInterval(() => {
      if (this.state.count < this.maxLapsInRace()) {
        this.setState({
          sortedLaps: this.state.raceData.filter((lap) => {
            return lap.lap == this.state.count
          }),
          count: this.state.count + 1,
          lap: this.state.lap + 1
        })
        this.calculateProgressBar(this.state.lap)
      } else {
        clearInterval(lapTicker)
      }
    }, 250)


    // cumulatively add laptimes to generate progress bar
    if (this.state.raceData) {
      this.state.raceData.forEach((lap) => { // I can't get this to work
        var driverSurname = lap.surname
        var stateCopy = Object.assign({}, this.state)
        // It needs to start at 0 so I don't get NaN when trying to add laps
        if (lap.milliseconds) {
          stateCopy[driverSurname] = this.state[driverSurname] || 0
          stateCopy[driverSurname] += lap.milliseconds
        }
        this.setState(stateCopy)
      })
    }

    console.log(this.state.visualIsRunning)
    this.setState({visualIsRunning: !this.state.visualIsRunning})
  }

  render() {
    if (this.state.raceData) {
      // console.log(this.state.raceData.filter((entry) => {
      //   return entry.lap === 1
      // }))
      return (
        <div className="race">
          <h2>{this.state.raceYear} {this.state.raceName}</h2>
          <button onClick={() => this.handleClick()}>Start visualisation</button>
          <h3>Lap {this.state.lap} of {this.maxLapsInRace()}</h3>
          {this.showRace(this.state.raceData)}
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
