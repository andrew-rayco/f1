import React from 'react'

import * as api from '../api'
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

  render() {
    console.log('this.state:', this.state)
    if (this.state.grid) {
      let grid = this.state.grid.gridData
      console.log('typeof this.state.grid.gridData:', typeof grid, '(should be an array!?)')
      console.log('this.state.grid.gridData[0]:', this.state.grid.gridData[0])
      return (
        <div className="grid sub-section">
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
    } else {
      console.log('Renders an empty div before this.state.grid is defined. As expected.')
      return <div></div>
    }
  }

}
