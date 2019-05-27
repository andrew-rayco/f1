import React from 'react'

import * as apiRoutes from '../../server/apiRoutes'
import * as h from '../helpers/helpers'
import RaceOptions from './RaceOptions'

export default class Grid extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    componentWillMount() {
        let season, raceId, round
        if (this.props.season) {
            season = this.props.season
            raceId = this.props.raceId
            round = this.props.round
        } else {
            let location = this.props.location.pathname
            let pathArray = location.split('/')
            season = pathArray[2]
            raceId = pathArray[3]
        }
        if (!raceId) raceId = round
        apiRoutes.getGrid(season, raceId, (grid) => {
            this.setState({ grid })
        })
    }

    listGrid(fullGrid) {
        return fullGrid.map((driver, i) => {
            return (
                <tr key={driver.surname || i}>
                    <td className="position">
                        <strong>{driver.grid}</strong>
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
                            <th className="position">
                                {
                                window.innerWidth < 450
                                  ? 'Pos'
                                  : 'Position'
                                }
                            </th>
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
                {
                    this.state.grid && !this.state.grid.noData
                        ? this.buildGridTable()
                        : h.handleLoadingOrError(this.state.grid)}
            </div>
        )
    }
}
