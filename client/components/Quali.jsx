import React from 'react'

import * as api from '../api'
import RaceOptions from './RaceOptions'

export default class Quali extends React.Component {
  constructor() {
    super(),
    this.state = {}
  }

  componentWillMount() {
    let season = this.props.season
    let raceId = this.props.raceId
    api.getQuali(season, raceId, (qualifyingData) => {
      this.setState({qualifyingData})
    })
  }

  listResults(qualiData) {
    let allResults = qualiData.qualifyingData
    return allResults.map((driverResult) => {
      return (
        <tr key={driverResult.qualifyId}>
          <td><strong>{driverResult.position}</strong></td>
          <td><a href={driverResult.driverUrl}>{driverResult.forename} {driverResult.surname}</a></td>
          <td><a href={driverResult.constructorUrl}>{driverResult.constructorName}</a></td>
          <td>{driverResult.q1}</td>
          <td>{driverResult.q2}</td>
          <td>{driverResult.q3}</td>
        </tr>
      )
    })
  }

  render() {
    let qualiData = this.state.qualifyingData
    if (qualiData && !qualiData.noData) {
      var quali = this.state.qualifyingData
      return (
        <div className="quali-results sub-section">
          <h2>{quali.qualifyingData[0].year} {quali.raceName}</h2>
          <h3>Qualifying results</h3>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
              </tr>
            </thead>
            <tbody>
              {this.listResults(quali)}
            </tbody>
          </table>
        </div>
      )
    } else if (qualiData && qualiData.noData) {
      return <div>
        <div className="no-data">Sorry, there is no data here. <br/>
        The event is either too old for the data to exist, or too new for this app that is manually updated by an ageing sloth-beast.</div>
      </div>
    } else {
      return <div>Loading...</div>
    }
  }
}
