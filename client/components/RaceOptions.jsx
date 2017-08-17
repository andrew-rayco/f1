import React from 'react'
import moment from 'moment'

import Grid from './Grid'

export default class RaceOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibile: true,
      gridVisible: false
    }
  }

  componentWillMount() {
    this.setState({race: this.props.props})
  }


  toggleHidden(e, elementToToggle) {
    e.preventDefault()
    let raceDetails = document.getElementById(elementToToggle)
    raceDetails.classList.toggle('hidden')
  }

  handleClick(e) {
    e.preventDefault()
    // this.state.gridVisible = !this.state.gridVisible
  }

  render() {
    let race = this.state.race
    console.log(this.state.gridVisible)
    // let hidden = 'hidden'
    return (
      <div key={race.raceId} className="row single-round">
        <div className="twelve columns round">
          { (this.state.visibile) ?
            <h4 onClick={(e) => this.toggleHidden(e, race.raceId)}><a href="#">Round {race.round} - {race.raceName}</a></h4> :
            <h4>Round {race.round} - {race.raceName}</h4>
          }
          <div id={race.raceId} className={`toggle hidden`}>
            <p>{moment(race.date).format('MMMM Do YYYY')}</p>
            <p><a href={`/#/season/${race.year}/${race.raceId}/qualifying`}>Qualifying results</a></p>
            <p><a onClick={(e) => this.handleClick(e)}>Starting grid</a></p>
            {(this.state.gridVisible) ? <Grid season={race.year} raceId={race.raceId} /> : null}
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
