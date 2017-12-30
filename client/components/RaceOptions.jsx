import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import Grid from './Grid'
import Quali from './Quali'
import Results from './Results'

export default class RaceOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gridVisible: false,
      qualiVisible: false,
      resultsVisible: false
    }
  }

  toggleHidden(e, elementToToggle) {
    e.preventDefault()
    let raceDetails = document.getElementById(elementToToggle)
    let raceSection = document.getElementsByClassName(this.props.race.raceId)[0]
    raceDetails.classList.toggle('hidden')
    raceSection.classList.toggle('selected')
  }

  handleClick(e, visibleProperty) {
    e.preventDefault()
    this.setState({[visibleProperty]: !this.state[visibleProperty]})
    e.target.classList.toggle('toggle-open')
  }

  visualise(race) {
    return (
      <p>
        <a href={`/#/season/${race.year}/${race.raceId}/visualise`}>Visualise</a>
      </p>
    )
  }

  render() {
    let race = this.props.race
    return (
      <div key={race.raceId} className="row single-round">
        <div className={`twelve columns round ${race.raceId}`}>
          <h4 onClick={(e) => this.toggleHidden(e, race.raceId)}><a href="#">{(this.props.intro) ?
            `${this.props.intro} the ${race.year} ${race.name}` :
            `${race.round} - ${race.raceName || race.name}`}
          </a></h4>
          <div id={race.raceId} className={`toggle hidden`}>
            <p>{moment(race.date).format('MMMM Do YYYY')}</p>
            <p><a onClick={(e) => this.handleClick(e, 'qualiVisible')} href="#" className="togglable">Qualifying results <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon"/></a></p>
            {(this.state.qualiVisible) ?
              <Quali season={race.year} raceId={race.raceId} round={race.round} /> :
              null
            }
            <p><a onClick={(e) => this.handleClick(e, 'gridVisible')} href="#" className="togglable">Starting grid <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon"/></a></p>
            {(this.state.gridVisible) ?
              <Grid season={race.year} raceId={race.raceId} round={race.round} /> :
              null
            }

            {this.props.intro ? null : this.visualise(race)}

            <p><a onClick={(e) => this.handleClick(e, 'resultsVisible')} href="#" className="togglable">Results <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon"/></a></p>
            {(this.state.resultsVisible) ?
              <Results season={race.year} raceId={race.raceId} round={race.round} /> :
              null
            }
            <p><a href={race.raceUrl || race.url}>{race.year} {race.raceName || race.name} on Wikipedia</a></p>
            <div className="separator"></div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = RaceOptions
