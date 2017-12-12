import React from 'react'

import * as api from '../api'
import RaceOptions from './RaceOptions'
import Loading from './Loading'

export default class Results extends React.Component {
  constructor() {
    super(),
    this.state = {}
  }

  componentWillMount() {
    let season = this.props.season
    let raceId = this.props.raceId
    api.getRaceResults(season, raceId, (results) => {
      this.setState({results})
    })
  }

  listResults(results) {
    let fastestLap = this.findFastestLap(results)
    return results.map((driverResult) => {
      return (
        <tr key={driverResult.resultId}>
          <td>
            <strong>{driverResult.position}</strong>
          </td>
          <td>
            <a href={driverResult.driverUrl}>{driverResult.forename} {driverResult.surname}</a>
          </td>
          <td>
            <a href={driverResult.constructorUrl}>{driverResult.constructorName}</a>
          </td>
          <td>{driverResult.raceTime
              ? driverResult.raceTime
              : `+ ${ (this.state.results[0].laps - driverResult.laps)} laps`}</td>
          <td>{this.highlightFastestLap(driverResult.fastestLapTime, fastestLap)}</td>
        </tr>
      )
    })
  }

  findFastestLap(results) {
    let fastestLapTime
    let fastestLapSpeed = 0
    results.map((result) => {
      if (result.fastestLapSpeed && result.fastestLapSpeed >= fastestLapSpeed) {
        fastestLapSpeed = result.fastestLapSpeed
        fastestLapTime = result.fastestLapTime
      }
    })
    return fastestLapTime
  }

  highlightFastestLap(laptime, fastestLap) {
    if (laptime) {
      if (laptime != fastestLap) {
        return laptime
      } else {
        return <strong>{laptime}</strong>
      }
    } else {
      return '-'
    }
  }

  buildResultsTable() {
    let results = this.state.results
    return (
      <div className="content">
        <h2>{results[0].raceYear} {results[0].raceName}</h2>
        <h3>Race results</h3>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Race Time</th>
              <th>Fastest lap</th>
            </tr>
          </thead>
          <tbody>
            {this.listResults(results)}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="results sub-section">
        {this.state.results
          ? this.buildResultsTable()
          : <Loading />}
      </div>
    )
  }

}
