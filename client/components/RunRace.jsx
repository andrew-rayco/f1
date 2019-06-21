import React from 'react'

import * as apiRoutes from '../../server/apiRoutes'
import * as hVis from '../helpers/visualisation'
import * as hRet from '../helpers/retiredDrivers'
import RaceOptions from './RaceOptions'
import Loading from './Loading'

class RunRace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lap: 1,
      visualIsRunning: false,
      visualIsComplete: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.getAndSetRaceInfo()
  }

  componentDidUpdate() {
    // ensure getAndSetRaceInfo is complete before running setRaceDetails
    if (
      this.state.raceData &&
      !this.state.raceData.noData &&
      this.state.winner &&
      !this.state.maxLaps
    ) {
      this.setRaceDetails()
    }
  }

  getAndSetRaceInfo() {
    let location = this.props.location.pathname
    let pathArray = location.split('/')
    let season = pathArray[2]
    let raceRound = pathArray[3]

    apiRoutes.getRaceDetails(
      season,
      raceRound,
      raceInfo => {
        let raceWinner = raceInfo.Results.filter(result => {
          return result.position === '1'
        })[0]
        this.setState({
          raceName: raceInfo.raceName,
          raceYear: raceInfo.season,
          results: raceInfo.Results,
          winner: {
            winningDriver: raceWinner.Driver.familyName,
            winningTime: raceWinner.Time.millis,
            laps: raceWinner.laps
          }
        })
      },
      apiRoutes.getVisData(season, raceRound, raceData => {
        this.setState({ raceData })
      })
    )
  }

  setRaceDetails() {
    let allDrivers = hVis.getAllDriversInRace(this.state.results)
    let maxLaps = this.state.winner.laps

    this.setState({
      allDrivers,
      maxLaps
    })
  }

  handleClick() {
    const st = this.state
    if (!st.visualIsRunning || st.visualIsComplete) {
      // this.setState({ visualIsRunning: true })
      if (st.visualIsComplete) {
        this.setState(
          {
            lap: 1,
            visualIsComplete: false,
            visualIsRunning: true
          },
          this.ticker
        )
      } else {
        this.setState(
          {
            visualIsRunning: true
          },
          this.ticker
        )
      }
    } else if (st.visualIsRunning) {
      this.setState({ visualIsRunning: false })
      console.log('######### this should be working')
    }
  }

  ticker() {
    const st = this.state
    var lapTicker = setInterval(() => {
      if (st.visualIsRunning) {
        if (this.state.lap < this.state.maxLaps) {
          let newAllDrivers = this.state.allDrivers
          for (var key in this.state.allDrivers) {
            var currentDriverLap = hVis.getCurrentDriverLap(
              key,
              this.state.lap,
              this.state.raceData
            )
            newAllDrivers[key].raceMilliseconds += currentDriverLap.milliseconds
          }
          this.setState({
            visualIsRunning: true,
            allDrivers: newAllDrivers,
            lap: this.state.lap + 1
          })
        } else if (st.lap == st.maxLaps) {
          this.setState({
            visualIsRunning: false,
            visualIsComplete: true
          })
          clearInterval(lapTicker)
        } else {
          this.setState({ visualIsRunning: false })
          clearInterval(lapTicker)
        }
      }
    }, 50)
  }

  showRace(data) {
    let winner = this.state.winner.winningDriver
    let winningTime = this.state.winner.winningTime
    let maxLaps = this.state.maxLaps
    let allDrivers = this.state.allDrivers

    let lapData = hVis.buildLapData(
      this.state.raceData,
      maxLaps,
      this.state.lap,
      this.state.results
    )

    // Find retired drivers to ultimately add to lapData
    let retiredDrivers = hRet.findRetiredDrivers(lapData, this.state.results)

    // Add retired drivers last laps to the lapData
    lapData = hRet.addRetiredLaps(lapData, retiredDrivers, this.state.lap)

    // Add 'did not starts' to the lapData
    if (lapData.length < this.state.results.length) {
      this.state.results.forEach(result => {
        if (
          isNaN(parseInt(result.positionText)) &&
          result.positionText != 'R'
        ) {
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

      if (
        hRet.driverDoesNotRetire(driverSurname, retiredDrivers) ||
        !hRet.hasDriverRetiredYet(driverSurname, retiredDrivers, this.state.lap)
      ) {
        if (this.state.lap > maxLaps * 0.2) {
          return (
            <div key={i} className="driver">
              <div className={(driverSurname, `driverBar`)}>
                <div
                  className="vis-color"
                  style={{
                    width:
                      hVis.calcWidth(
                        driverSurname,
                        winner,
                        allDrivers,
                        winningTime,
                        maxLaps
                      ) + '%'
                  }}
                >
                  {driverLap.position || driverLap.positionText}:{' '}
                  {driverSurname}
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={i} className="driver">
              <div className={(driverSurname, `driverBar`)}>
                {driverLap.position || driverLap.positionText}: {driverSurname}
                <div
                  className="vis-color"
                  style={{
                    width:
                      hVis.calcWidth(
                        driverSurname,
                        winner,
                        allDrivers,
                        winningTime,
                        maxLaps
                      ) + '%'
                  }}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          )
        }
      } else if (
        hRet.hasDriverRetiredYet(driverSurname, retiredDrivers, this.state.lap)
      ) {
        if (driverLap.laps < maxLaps * 0.4) {
          return (
            <div key={i} className="driver">
              <div className={'driverBar ' + driverSurname}>
                {driverLap.position || driverLap.positionOrder}: {driverSurname}{' '}
                - Lap {driverLap.laps}
                <div
                  className="vis-color"
                  style={{
                    width:
                      (this.state.allDrivers[driverSurname] / winningTime) *
                        100 +
                      '%',
                    backgroundColor: 'red'
                  }}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div key={i} className="driver">
              <div className={'driverBar ' + driverSurname}>
                <div
                  className="vis-color"
                  style={{
                    width:
                      (this.state.allDrivers[driverSurname] / winningTime) *
                        100 +
                      '%',
                    backgroundColor: 'red'
                  }}
                >
                  {driverLap.position || driverLap.positionOrder}:{' '}
                  {driverSurname} - Lap {driverLap.laps}
                </div>
              </div>
            </div>
          )
        }
      }
    })
  }

  render() {
    let raceData = this.state.raceData
    let st = this.state
    console.log(st)

    if (raceData && !raceData.noData && this.state.results) {
      let race = this.state.results[0]
      return (
        <div className="race">
          <h2>
            {st.raceYear} {st.raceName}
          </h2>
          <button onClick={this.handleClick}>
            {this.state.visualIsRunning ? 'Pause ' : 'Start '} visualisation
          </button>
          <p className="beta">This feature is in beta.</p>

          <h3>
            Lap {st.lap} of {st.maxLaps}
          </h3>
          {st.allDrivers ? this.showRace(raceData) : <Loading />}
          {/* <p><Link to={this.nextRaceLink()}>Next Race</Link></p> */}
          <div className="more-from">
            <RaceOptions key={race.raceId} race={race} intro="More from" />
          </div>
        </div>
      )
    } else if (raceData && raceData.noData && this.state.results) {
      let race = this.state.results[0]
      console.log(race)
      return (
        <div>
          <p>
            Sorry. Visualisation isn't possible for this event. <br />
            This feature needs data that only started becoming available
            mid-2011.
          </p>
          <RaceOptions
            key={race.raceId}
            race={race}
            intro="See other info from"
          />
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

export default RunRace
