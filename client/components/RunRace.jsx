// Remember, for inline styles use style={{marginRight: spacing + 'em'}} when using JSX
import React from 'react'
import { Link } from 'react-router-dom'

import * as api from '../api'
import * as hVis from '../helpers/visualisation'
import * as hRet from '../helpers/retiredDrivers'
import RaceOptions from './RaceOptions'
import Loading from './Loading'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lap: 1,
      visualIsRunning: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.getAndSetRaceInfo()
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
      raceData.noData ? null : this.setRaceDetails()
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

  // nextRaceLink () {
  //   let location = this.props.location.pathname
  //   let pathArray = location.split('/')
  //   let season = pathArray[2]
  //
  //   pathArray[3] = Number(pathArray[3]) + 1
  //   return `/season/${season}/${pathArray[3]}/${pathArray[4]}`
  // }

  handleClick () {
    if (!this.state.visualIsRunning) {
      this.setState({visualIsRunning: true})
      var lapTicker = setInterval(() => {
        if (this.state.lap < this.state.maxLaps) {
          var newAllDrivers = {}
          for (var key in this.state.allDrivers) {
            var currentDriverLap = hVis.getCurrentDriverLap(key, this.state.lap, this.state.raceData)
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
    } else {
      clearInterval(lapTicker)
      console.log('this should be working')
    }
  }

  showRace (data) {
    let winner = this.state.winner.winningDriver
    let winningTime = this.state.winner.winningTime
    let maxLaps = this.state.maxLaps
    let allDrivers = this.state.allDrivers

    let lapData = hVis.buildLapData(this.state.raceData, maxLaps, this.state.lap, this.state.results)

    // Find retired drivers to ultimately add to lapData
    let retiredDrivers = hRet.findRetiredDrivers(lapData, this.state.results)

    // Add retired drivers last laps to the lapData
    lapData = hRet.addRetiredLaps(lapData, retiredDrivers, this.state.lap)

    // Add 'did not starts' to the lapData
    if (lapData.length < this.state.results.length) {
      this.state.results.forEach((result) => {
        if (isNaN(parseInt(result.positionText)) && result.positionText != 'R') {
          lapData.push({
            surname: result.surname,
            positionText: result.positionText,
            positionOrder: result.positionOrder
          })
        }
      })
    }

    return lapData.map((driverLap, i) => {
      let driverSurname = driverLap.surname

      if (hRet.driverDoesNotRetire(driverSurname, retiredDrivers) || !hRet.hasDriverRetiredYet(driverSurname, retiredDrivers, this.state.lap)) {
        if (this.state.lap > maxLaps * .20) {
          return (
            <div key={i} className="driver">
              <div className={driverSurname, `driverBar`}>
                <div className="vis-color" style={{
                  width: hVis.calcWidth(
                    driverSurname,
                    winner,
                    allDrivers,
                    winningTime,
                    maxLaps) + '%'
                }}>{driverLap.position || driverLap.positionText}: {driverSurname}</div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={i} className="driver">
              <div className={driverSurname, `driverBar`}>
                {driverLap.position || driverLap.positionText}: {driverSurname}
                <div className="vis-color" style={{
                  width: hVis.calcWidth(
                    driverSurname,
                    winner,
                    allDrivers,
                    winningTime,
                    maxLaps) + '%'
                }}>&nbsp;</div>
              </div>
            </div>
          )
        }
      } else if (hRet.hasDriverRetiredYet(driverSurname, retiredDrivers, this.state.lap)) {
        if (driverLap.laps < maxLaps * .40) {
          return (
            <div key={i} className="driver">
              <div className={'driverBar ' + driverSurname} >
                {driverLap.position || driverLap.positionOrder}: {driverSurname} - Lap {driverLap.laps}
                <div className="vis-color" style={{
                  width: (this.state.allDrivers[driverSurname] / winningTime) * 100 + '%', backgroundColor: 'red'
                }}>&nbsp;</div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={i} className="driver">
              <div className={'driverBar ' + driverSurname} ><div className="vis-color" style={{
                  width: (this.state.allDrivers[driverSurname] / winningTime) * 100 + '%', backgroundColor: 'red'
                }}>{driverLap.position || driverLap.positionOrder}: {driverSurname} - Lap {driverLap.laps}</div>
              </div>
            </div>
          )
        }
      }
    })
  }

  render () {
    let raceData = this.state.raceData
    let st = this.state
    if (raceData && !raceData.noData) {
      let race = this.state.results[0]
      return (
        <div className="race">
          <h2>{st.raceYear} {st.raceName}</h2>
          <button onClick={this.handleClick}>Start visualisation</button>
          <p className="beta">This feature is in beta.</p>
          <h3>Lap {st.lap} of {st.maxLaps}</h3>
          {st.allDrivers ? this.showRace(raceData) : <Loading />}
          {/* <p><Link to={this.nextRaceLink()}>Next Race</Link></p> */}
          <div className="more-from">
            <RaceOptions key={race.raceId} race={race} intro='More from' />
          </div>
        </div>
      )
    } else if (raceData && raceData.noData && this.state.results) {
      let race = this.state.results[0]
      return (
        <div>
          <p>Sorry. Visualisation isn't possible for this event. <br/>
          This feature needs data that only started becoming available mid-2011.</p>
          <RaceOptions key={race.raceId} race={race} intro='See other info from' />
        </div>
      )
    } else {
      return (
        <Loading />
      )
    }
  }
}

export default RunRace
