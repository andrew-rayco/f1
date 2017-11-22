import React, {Component} from 'react';

class ShowRace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raceData: this.props.props.raceData,
      winner: this.props.props.winner,
      maxLaps: this.props.props.maxLaps,
      allDrivers: this.props.props.allDrivers,
      results: this.props.props.results
    }
  }

  componentWillMount () {
    this.raceCalculations()
  }

  // How do I get lapData to pass into the rendering of showAllLaps?
  raceCalculations() {
    var winner = this.state.winner.winningDriver
    var totalRaceTime = this.state.winner.winningTime
    var totalRaceLaps = this.state.maxLaps
    let allDrivers = this.state.allDrivers
    let lapData = this.state.raceData.filter((lap) => {
      return lap.lap === this.props.props.lap
    })
    this.lappedDriversCalculations(lapData)
  }

  lappedDriversCalculations (lapData) {
    // Find drivers where result.positionText != 'R'
    let unretiredDrivers = this.state.results.filter((result) => {
      return result.positionText != 'R'
    })

    // Find drivers who haven't retired but complete fewer than maxLaps
    let lappedDrivers = unretiredDrivers.filter((result) => {
      return result.laps < this.state.maxLaps
    })

    // If drivers last lap is not as high as current lap, add drivers last lap to lapData
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
  }

  findRetiredDrivers(lapData) {
    var retiredDriversArray = []

    // Find all drivers with result positionText of 'R'
    var driversWithR = this.state.results.filter((result) => {
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

  addRetiredLaps(lapData, retiredDrivers) {
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

  showAllLaps(lapData) {
    return lapData.map((driverLap, i) => {
      if (this.driverDoesNotRetire(driverLap.surname, retiredDrivers) || !this.hasDriverRetiredYet(driverLap.surname, retiredDrivers)) {
        if (this.state.lap > this.state.maxLaps * .20) {
          return (
            <div key={i} className="driver">
              <div className={driverLap.surname,
              `driverBar`}>
                <div className="vis-color" style={{
                  width: this.calcWidth(driverLap.surname, winner) + '%'
                }}>{driverLap.position || driverLap.positionText}: {driverLap.surname}</div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={i} className="driver">
              <div className={driverLap.surname,
              `driverBar`}>
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
            <div className={'driverBar ' + driverLap.surname}>
              {driverLap.position || driverLap.positionOrder}: {driverLap.surname}
              - Lap {driverLap.laps}
              <div className="vis-color" style={{
                width: (this.state.allDrivers[driverLap.surname] / totalRaceTime) * 100 + '%',
                backgroundColor: 'red'
              }}>&nbsp;</div>
            </div>
          </div>
        )
      }
    })
  }

  render() {
    return (
      <div>Hello</div>
    );
  }

}

export default ShowRace;
