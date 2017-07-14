import React from 'react'

import * as api from '../api'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      seasons: null
    }
  }

  componentWillMount() {
    api.getSeasons((seasons) => {
      this.setState({seasons})
    })
  }

  listSeasons(seasons) {
    return seasons.map((item) => {
      let year = item.year
      return <li key={year}><a href={`api-v1/season/${year}`}>{year}</a></li>
    })
  }

  render() {
    return (
        <div className="row">
          <div className="twelve columns home">
            <h3>Seasons</h3>
            <ul>
              {this.state.seasons ? this.listSeasons(this.state.seasons) : 'loading...'}
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
