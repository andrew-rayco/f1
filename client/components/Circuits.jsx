import React from 'react'

import * as api from '../api'

export default class Circuits extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount() {
    api.getCircuits((circuits) => {
      this.setState({circuits})
    })
    console.log(this.state.circuits)
  }

  listCircuits(circuits) {
    return circuits.map((item) => {
      return <li key={item.year}><a href={`api-v1/season/${item.year}`}>{item.year}</a></li>
    })
  }

  render() {
    return (
        <div className="row">
          <div className="twelve columns home">
            <h3>Circuits</h3>
            <ul>
              {this.state.circuits ? this.listCircuits(this.state.circuits) : 'loading...'}
            </ul>
          </div>
        </div>
    )
  }

}
