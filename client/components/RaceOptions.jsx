import React from 'react'
import moment from 'moment'

import Grid from './Grid'
import Quali from './Quali'

export default class RaceOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gridVisible: false,
      qualiVisible: false
    }
  }

  componentWillMount() {
    this.setState({race: this.props.props})
  }


  toggleHidden(e, elementToToggle) {
    e.preventDefault()
    let raceDetails = document.getElementById(elementToToggle)
    let raceSection = document.getElementsByClassName(this.state.race.raceId)[0]
    raceDetails.classList.toggle('hidden')
    raceSection.classList.toggle('selected')
  }

  handleClick(e, visibleProperty) {
    e.preventDefault()
    this.setState({[visibleProperty]: !this.state[visibleProperty]})
  }

  render() {
    let race = this.state.race
    return (
      <div key={race.raceId} className="row single-round">
        <div className={`twelve columns round ${race.raceId}`}>
          <h4 onClick={(e) => this.toggleHidden(e, race.raceId)}><a href="#">Round {race.round} - {race.raceName}</a></h4>
          <div id={race.raceId} className={`toggle hidden`}>
            <p>{moment(race.date).format('MMMM Do YYYY')}</p>
            <p><a onClick={(e) => this.handleClick(e, 'qualiVisible')} href="#">Qualifying results</a></p>
            {(this.state.qualiVisible) ?
              <Quali season={race.year} raceId={race.raceId} /> :
              null
            }
            <p><a onClick={(e) => this.handleClick(e, 'gridVisible')} href="#">Starting grid</a></p>
            {(this.state.gridVisible) ?
              <Grid season={race.year} raceId={race.raceId} /> :
              null
            }
            <p><a href={`/#/season/${race.year}/${race.raceId}/visualise`}>Visualise</a></p>
            <p><a href={`/#/season/${race.year}/${race.raceId}/results`}>Results</a></p>
            <p><a href={race.raceUrl}>{race.year} {race.raceName} on Wikipedia</a></p>
            <div className="separator"></div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = RaceOptions
