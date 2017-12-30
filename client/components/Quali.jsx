import React from 'react'

import * as api from '../api'
import * as h from '../helpers/helpers'
import RaceOptions from './RaceOptions'

export default class Quali extends React.Component {
  constructor() {
    super(),
    this.state = {}
  }

  componentWillMount() {
    let season = this.props.season
    let raceId = this.props.raceId
    let round = this.props.round
    api.getQuali(season, raceId, round, (qualifyingData) => {
      this.setState({qualifyingData})
    })
  }

  listResults(qualiData) {
    let allResults = qualiData.qualifyingData
    return allResults.map((driverResult) => {
      return (
        <tr key={driverResult.qualifyId}>
          <td className="position"><strong>{driverResult.position}</strong></td>
          <td><a href={driverResult.driverUrl}>{driverResult.forename} {driverResult.surname}</a></td>
          <td><a href={driverResult.constructorUrl}>{driverResult.constructorName}</a></td>
          <td className="optional">{driverResult.q1}</td>
          <td className="optional">{driverResult.q2}</td>
          <td className="optional">{driverResult.q3}</td>
          <td className="alternative">{driverResult.q3 || driverResult.q2 || driverResult.q1}</td>
        </tr>
      )
    })
  }

  buildQualiTable() {
    let quali = this.state.qualifyingData
    return (
      <div className="content">
        <h2>{quali.qualifyingData[0].year} {quali.raceName}</h2>
        <h3>Qualifying results</h3>
        <table>
          <thead>
            <tr>
              <th className="position">{
                document.body.clientWidth < 450
                  ? 'Pos' : 'Position'
                }</th>
              <th>Driver</th>
              <th>Team</th>
              <th className="optional">Q1</th>
              <th className="optional">Q2</th>
              <th className="optional">Q3</th>
              <th className="alternative">Time</th>
            </tr>
          </thead>
          <tbody>
            {this.listResults(quali)}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    let qualiData = this.state.qualifyingData
    return (
      <div className="quali-results sub-section">
        {qualiData && !qualiData.noData
          ? this.buildQualiTable()
          : h.handleLoadingOrError(qualiData)}
      </div>
    )
  }
}
