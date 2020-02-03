import React from 'react'

import * as apiRoutes from '../../server/apiRoutes'
import Loading from './Loading'

export default class Circuits extends React.Component {
    constructor() {
        super()
        this.state = {
            circuits: null
        }
    }

    UNSAFE_componentWillMount() {
        apiRoutes.getCircuits((circuits) => {
            this.setState({ circuits })
        })
    }

    listCircuits(circuitsObj) {
        let circuits = Array.from(circuitsObj)
        return circuits.map((track) => {
            const location = track.Location
            return (
                <tr key={track.circuitId}>
                    <td>{location.country}</td>
                    <td>
                        <a href={track.url}>{track.circuitName}</a>
                    </td>
                    <td>{location.locality}</td>
                    <td>
                        <a href={`https://www.google.co.nz/maps/@?api=1&map_action=map&center=${location.lat},${location.long}&zoom=15&basemap=satellite`}>View</a>
                    </td>
                </tr>
            )
        })
    }

    renderCircuitTable() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Circuit name</th>
                        <th>Locality</th>
                        <th>Map</th>
                    </tr>
                </thead>
                <tbody>
                    {this.listCircuits(this.state.circuits)}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="circuit-list">
                <h2>Circuits</h2>
                <h4>Every circuit in the history of Formula 1</h4>
                {
                    this.state.circuits
                    ? this.renderCircuitTable()
                    : <Loading />
                }
            </div>
        )
    }
}
