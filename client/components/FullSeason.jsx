import React from 'react'

import * as api from '../api'
import RaceOptions from './RaceOptions'

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
        <div key={`key${race.raceId}`}>
          <RaceOptions key={race.raceId} props={race} />
          <div className="separator"></div>
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
