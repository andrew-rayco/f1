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
        let raceSection = document.getElementsByClassName(this.props.race.round)[0]
        raceDetails.classList.toggle('hidden')
        raceSection.classList.toggle('selected')
    }

    handleClick(e, visibleProperty) {
        e.preventDefault()
        this.setState({
            [visibleProperty]: !this.state[visibleProperty]
        })
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
        const raceDate = new Date(race.date + ' ' + race.time)
        const todayDate = new Date()

        // Check if race is in past or future. If future, disable selection
        if (raceDate > todayDate) {
            return (
                <div key={race.round} className="row single-round">
                    <div className={`twelve columns round ${race.round}`}>
                        <h4 className="disabled">{`${race.round} - ${race.raceName || race.name}`}</h4>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={race.round} className="row single-round">
                    <div className={`twelve columns round ${race.round}`}>
                        <h4 onClick={(e) => this.toggleHidden(e, race.round)}>
                            <a href="#">
                                {
                                    (this.props.intro)
                                    ? `${this.props.intro} the ${race.year} ${race.name}`
                                    : `${race.round} - ${race.raceName || race.name}`
                                }
                            </a>
                        </h4>
                        <div id={race.round} className={`toggle hidden`}>
                            <p>{moment(race.date).format('MMMM Do YYYY')}</p>
                            <p>
                                <a
                                    onClick={(e) => this.handleClick(e, 'qualiVisible')} href="#"
                                    className="togglable"
                                >
                                    Qualifying results <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon"/>
                                </a>
                            </p>

                            {
                                this.state.qualiVisible
                                ? <Quali season={race.season} round={race.round} />
                                : null
                            }

                            <p>
                                <a
                                    onClick={(e) => this.handleClick(e, 'gridVisible')}
                                    href="#"
                                    className="togglable"
                                >
                                        Starting grid <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon"/>
                                </a>
                            </p>

                            {
                                this.state.gridVisible
                                ? <Grid season={race.season} round={race.round} />
                                : null
                            }

                            {
                                this.props.intro
                                ? null
                                : this.visualise(race)
                            }

                            <p>
                                <a
                                    onClick={(e) => this.handleClick(e, 'resultsVisible')}
                                    href="#"
                                    className="togglable"
                                    >
                                        Results <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon"/>
                                    </a>
                                </p>

                                {
                                    this.state.resultsVisible
                                    ? <Results season={race.season} round={race.round} />
                                    : null
                                }

                                <p><a href={race.url}>{race.season} {race.raceName} on Wikipedia</a></p>
                                <div className="separator"></div>
                            </div>
                        </div>
                    </div>
                )
            }
    }
}

module.exports = RaceOptions
