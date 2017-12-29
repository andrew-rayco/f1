import React from 'react'

import * as api from '../api'
import ListSeason from './ListSeason'
import Loading from './Loading'

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
    console.log(seasons);
    return seasons.map(({year}) => {
      return <ListSeason year={year} key={year}/>
    })
  }

  render() {
    return (
      <div className="row">
        <div className="twelve columns home">
          <h3>Seasons</h3>
          <ul className="seasons">
            {this.state.seasons
              ? this.listSeasons(this.state.seasons)
              : <Loading />}
          </ul>

          <h3>Circuits</h3>
          <div className="circuits">
            <a href="/#/circuits">See all the circuits</a>
          </div>
        </div>
      </div>
    )
  }
}
