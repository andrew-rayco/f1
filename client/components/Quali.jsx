import React from 'react'

import * as api from '../api'

export default class Quali extends React.Component {
  constructor() {
    super(),
    this.state = {}
  }

  componentWillMount() {
    var location = this.props.location.pathname
    var pathArray = location.split('/')
    var season = pathArray[2]
    var raceId = pathArray[3]
    api.getQuali(season, raceId, (qualifyingData) => {
      this.setState({qualifyingData})
    })
  }

  listResults(qualiData) {
    console.log(qualiData.qualifyingData)
    let allResults = qualiData.qualifyingData
    return allResults.map((driverResult) => {
      return (
        <tr key={driverResult.qualifyId}>
          <td><strong>{driverResult.position}</strong></td>
          <td><a href={driverResult.url}>{driverResult.forename} {driverResult.surname}</a></td>
          <td><a href={driverResult.constructorUrl}>{driverResult.constructorName}</a></td>
          <td>{driverResult.q1}</td>
          <td>{driverResult.q2}</td>
          <td>{driverResult.q3}</td>
        </tr>
      )
    })
  }

  render() {
    if (this.state.qualifyingData) {
      var location = this.props.location.pathname
      var pathArray = location.split('/')
      var season = pathArray[2]
      var quali = this.state.qualifyingData
      {console.log(this.state.qualifyingData)}
      return (
        <div className="quali-results">
          <h2>{season} {quali.raceName}</h2>
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
    } else {
      return <div></div>
    }
  }
}
