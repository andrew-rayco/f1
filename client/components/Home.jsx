import React from 'react'

import * as api from '../api'
import ListSeasons from './ListSeasons'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    api.getSeasons((seasons) => {
      this.setState({seasons})
    })
  }

  listSeasons(seasons) {
    return seasons.map((season) => {
      return <ListSeasons year={season.year} key={season.year} />
    })
  }

  render() {
    console.log('state', this.state)
    console.log('this.state.seasons', this.state.seasons)
    console.log('props', this.props)
    return (
        <div className="row">
          <div className="twelve columns home">
            <h3>Seasons</h3>
            <ul className="seasons">
              {this.state.seasons ? this.listSeasons(this.state.seasons) : <img className="center" src="/images/rolling.svg" alt="loading icon"/>}
            </ul>

            <h3>Circuits</h3>
            <div className="circuits">
              <a href="#/circuits">See all the circuits</a>
            </div>
          </div>
        </div>
    )
  }

}
