import React from 'react'

import * as api from '../api'
import RaceOptions from './RaceOptions'

export default class Grid extends React.Component {
  constructor() {
    super(),
    this.state = {}
  }

  componentWillMount() {
    let location = this.props.location.pathname
    let pathArray = location.split('/')
    let season = pathArray[2]
    let raceId = pathArray[3]
    api.getGrid(season, raceId, (grid) => {
      this.setState({grid})
    })
  }

  listGrid(fullGrid) {
    return fullGrid.map((driver) => {
      return (
        <tr key={driver.resultId}>
          <td><strong>{driver.grid}</strong></td>
          <td><a href={driver['driver-url']}>{driver.forename} {driver.surname}</a></td>
          <td><a href={driver.constructorUrl}>{driver.constructorName}</a></td>
        </tr>
      )
    })
  }

  render() {
    if (this.state.grid) {
      let grid = this.state.grid.gridData
      console.log(grid)
      return (
        <div className="grid">
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
          <RaceOptions props={grid[0]}/>
        </div>
      )
    } else {
      return <div></div>
    }
  }

}
