import React from 'react'

import * as api from '../api'
import * as h from '../helpers/helpers'
import RaceOptions from './RaceOptions'

export default class Grid extends React.Component {
  constructor() {
    super(),
    this.state = {}
  }

  componentWillMount() {
    let season,
      raceId
    if (this.props.season) {
      season = this.props.season
      raceId = this.props.raceId
    } else {
      let location = this.props.location.pathname
      let pathArray = location.split('/')
      season = pathArray[2]
      raceId = pathArray[3]
    }
    api.getGrid(season, raceId, (grid) => {
      this.setState({grid})
    })
  }

  listGrid(fullGrid) {
    return fullGrid.map((driver) => {
      return (
        <tr key={driver.resultId}>
          <td>
            <strong>{driver.positionOrder}</strong>
          </td>
          <td>
            <a href={driver.driverUrl}>{driver.forename} {driver.surname}</a>
          </td>
          <td>
            <a href={driver.constructorUrl}>{driver.constructorName}</a>
          </td>
        </tr>
      )
    })
  }

  buildGridTable() {
    let grid = this.state.grid.gridData
    return (
      <div className="content">
        <h2>{grid[0].year} {grid[0].raceName}</h2>
        <h3>Starting Grid</h3>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Driver</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {this.listGrid(grid)}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="grid sub-section">
        {this.state.grid && !this.state.grid.noData
          ? this.buildGridTable()
          : h.handleLoadingOrError(this.state.grid)}
      </div>
    )
  }

}
