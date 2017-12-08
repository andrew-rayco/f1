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
      return <li className="season" key={year}><a href={`/#/season/${year}`}>{year}</a></li>
    })
  }

  render() {
    if (this.state.seasons) {
      console.log(typeof this.state.seasons[0], this.state.seasons[0])
    }
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
