import React from 'react'

import * as api from '../api'

export default class Circuits extends React.Component {
  constructor() {
    super()
    this.state = {
      circuits: null
    }
  }

  componentWillMount() {
    api.getCircuits((circuits) => {
      this.setState({circuits})
    })
  }

  listCircuits(circuits) {
    return circuits.map((track) => {
      return (
        <tr key={track.circuitId}>
          <td>{track.country}</td>
          <td><a href={track.url}>{track.name}</a></td>
          <td>{track.location}</td>
          <td><a href={`https://www.google.co.nz/maps/@${track.lat},${track.lng},3916m/data=!3m1!1e3?hl=en`}>View</a></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="circuit-list">
        <h2>Circuits</h2>
        <h3>Every circuit in the history of Formula 1</h3>
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
            {this.state.circuits ? this.listCircuits(this.state.circuits) : console.log('loading') }
          </tbody>
        </table>
      </div>
    )
  }
}
