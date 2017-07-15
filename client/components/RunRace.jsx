import React from 'react'

import * as api from '../api'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lap: 1,
      sortedLaps: [], // All laptimes for current lap
      count: 1
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


  // calculate total race time for winner
  winnerRaceTime() {
    var winningTime = 0; // milliseconds
    this.state.raceData.forEach((lap) => {
      if (lap.surname == 'Ricciardo') { // hardcoded race winner. Most sub-optimal
        winningTime += lap.milliseconds
      }
    })
    return winningTime
  }

  // Find all laptimes for next lap and set state
  componentDidMount() {
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
    }, 150)


    // cumulatively add laptimes to generate progress bar
    this.props.raceData.forEach((lap) => { // I can't get this to work
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

  showRace(data) {
    let lapData = this.state.raceData
    return lapData.map((driverLap, i) => {
      if (driverLap.lap == this.state.count) {
        return (
          <div key={i} className="driver">
            <div className={driverLap.surname}>
              {driverLap.position}: {driverLap.surname}: {driverLap.time}
              <div className="vis-color" style={{
                width: this.calcWidth(driverLap.surname) + '%'
              }}>&nbsp;</div>
            </div>
          </div>
        )
      }
    })
  }

  // Remember, for inline styles use style={{marginRight: spacing + 'em'}} when using JSX

  calculateProgressBar(currentLap) {
    var cumulativePercentage = 0
    var winningRaceTime = this.winnerRaceTime()
    var lapIncrement = winningRaceTime / this.maxLapsInRace() // not necessary?
    var singleLap = 100 / this.maxLapsInRace()
    return singleLap
  }

  calcWidth(driver) {
    var randomNum = Math.floor(Math.random() * 1.5 + 1)
    var groundCovered = this.calculateProgressBar() * this.state.lap
    if (driver == 'Ricciardo') {
      return groundCovered
    } else {
      return groundCovered - randomNum
    }
  }

  render() {
    if (this.state.raceData) {
      return (
        <div className="race">
          <h2>{this.state.raceYear} {this.state.raceName}</h2>
          <h3>Lap {this.state.lap}</h3>
          {this.showRace(this.state.raceData)}
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default RunRace
