import React from 'react'

import * as api from '../api'

export default class FullSeason extends React.Component {
  constructor() {
    super()
    this.state = {
      races: null
    }
  }

  componentWillMount() {
    var location = this.props.location.pathname
    var pathArray = location.split('/')
    var thisSeason = pathArray[2]
    api.getRaces(thisSeason, (races) => {
      this.setState({races})
    })
  }

  listRaces(races) {
    return races.map((race) => {
      return (
        <div key={race.raceId} className="row single-round">
          <div className="twelve columns round">
            <h3><a href="#">Round {race.round} - {race.name}</a></h3>
            <div className="toggle">
              <p>{race.date}</p>
              <p><a href={`/#/season/${race.year}/${race.raceId}/qualifying`}>Qualifying results</a></p>
              <p><a href={`/#/season/${race.year}/${race.raceId}/grid`}>Starting grid</a></p>
              <p><a href={`/#/season/${race.year}/${race.raceId}/visualise`}>Visualise</a></p>
              <p><a href={`/#/season/${race.year}/${race.raceId}/results`}>Results</a></p>
              <p><a href={race['races-url']}>{race.year} {race.name} on Wikipedia</a></p>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    let racesInSeason = this.state.races
    if (racesInSeason) {
      return (
        <div className="season">
          <h2>The {racesInSeason[0].year} Formula 1 Season</h2>
          {this.listRaces(racesInSeason)}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
