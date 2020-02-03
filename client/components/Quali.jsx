import React from 'react'

import * as apiRoutes from '../../server/apiRoutes'
import * as h from '../helpers/helpers'
import RaceOptions from './RaceOptions'

export default class Quali extends React.Component {
  constructor() {
    super(), (this.state = {})
  }

  UNSAFE_componentWillMount() {
    let season = this.props.season
    let raceId = this.props.raceId
    let round = this.props.round
    apiRoutes.getQualifying(season, round, qualifyingData => {
      this.setState({ qualifyingData })
    })
  }

  listResults(qualiData, smallDisplay) {
    let allResults = qualiData.qualifyingData
    return allResults.map(driverResult => {
      return (
        <tr key={driverResult.surname + driverResult.forename}>
          <td className="position">
            <strong>{driverResult.position}</strong>
          </td>
          <td>
            <a href={driverResult.driverUrl}>
              {driverResult.forename} {driverResult.surname}
            </a>
          </td>
          <td>
            <a href={driverResult.constructorUrl}>
              {driverResult.constructorName}
            </a>
          </td>
          {!smallDisplay ? (
            <React.Fragment>
              <td className="optional">{driverResult.q1}</td>
              <td className="optional">{driverResult.q2}</td>
              <td className="optional">{driverResult.q3}</td>
            </React.Fragment>
          ) : (
            <td className="alternative">
              {driverResult.q3 || driverResult.q2 || driverResult.q1}
            </td>
          )}
        </tr>
      )
    })
  }

  buildQualiTable() {
    let quali = this.state.qualifyingData
    const smallDisplay = document.body.clientWidth < 550
    return (
      <div className="content">
        <h2>
          {quali.year} {quali.raceName}
        </h2>
        <h3>Qualifying results</h3>
        <table>
          <thead>
            <tr>
              <th className={smallDisplay ? 'pos' : 'position'}>
                {smallDisplay ? 'Pos' : 'Position'}
              </th>
              <th>Driver</th>
              <th>Team</th>
              {smallDisplay ? (
                <th className="alternative">Time</th>
              ) : (
                <React.Fragment>
                  <th className="optional">Q1</th>
                  <th className="optional">Q2</th>
                  <th className="optional">Q3</th>
                </React.Fragment>
              )}
            </tr>
          </thead>
          <tbody>{this.listResults(quali, smallDisplay)}</tbody>
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
