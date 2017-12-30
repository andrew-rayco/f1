import React from 'react'

import * as api from '../api'
import * as h from '../helpers/helpers'
import RaceOptions from './RaceOptions'

export default class Results extends React.Component {
  constructor() {
    super(),
    this.state = {}
  }

  componentWillMount() {
    let season = this.props.season
    let raceId = this.props.raceId
    let round = this.props.round
    api.getRaceResults(season, raceId, round, (results) => {
      this.setState({results})
    })
  }

  listResults(results) {
    let fastestLap = this.findFastestLap(results)
    return results.map((driverResult) => {
      return (
        <tr key={driverResult.surname + driverResult.position}>
          <td className="position">
            <strong>{driverResult.position}</strong>
          </td>
          <td>
            <a href={driverResult.driverUrl}>{driverResult.forename} {driverResult.surname}</a>
          </td>
          <td>
            <a href={driverResult.constructorUrl}>{driverResult.constructorName}</a>
          </td>
          <td>{driverResult.positionText != 'R'
              ? driverResult.raceTime || driverResult.status
              : `${driverResult.status} (${driverResult.laps})`}</td>
          <td className="optional">{this.highlightFastestLap(driverResult.fastestLapTime, fastestLap)}</td>
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
        <h2>{results.raceYear} {results.raceName}</h2>
        <h3>Race results</h3>
        <table>
          <thead>
            <tr>
              <th className="position">{
                document.body.clientWidth < 450
                  ? 'Pos' : 'Position'
                }</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Race Time</th>
              <th className="optional">Fastest lap</th>
            </tr>
          </thead>
          <tbody>
            {this.listResults(results.results)}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="results sub-section">
        {this.state.results && !this.state.results.noData
          ? this.buildResultsTable()
          : h.handleLoadingOrError(this.state.results)}
      </div>
    )
  }

}
