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
          <td><a href={`https://www.google.co.nz/maps/@${track.lat},${track.lng},3916m/data=!3m1!1e3?hl=en`}>View</a></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="circuit-list">
        <h1>Circuits</h1>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Circuit name</th>
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
