import React from 'react'

import * as apiRoutes from '../../server/apiRoutes'
import RaceOptions from './RaceOptions'
import Loading from './Loading'

export default class FullSeason extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            races: null,
            renderLoading: true
        }

        // Necessary for the error message after failed loading for 5 secs
        this.interval = null
    }

    componentWillMount() {
        var location = this.props.location.pathname
        var pathArray = location.split('/')
        var thisSeason = pathArray[2]
        apiRoutes.getSingleSeason(thisSeason, (races) => {
            this.setState({ races })
        })
    }

    // This is purely for the error loading message after 5 seconds trying.
    componentDidMount() {
        this.interval = setTimeout(() => this.setState({ renderLoading: false }), 5000)
    }

    listRaces(races) {
        const toggleStatus = { visibility: 'hidden' }

        return races.map((race) => {
            return (
                <div key={`key${race.round}`}>
                    <RaceOptions key={race.round} race={race} visibility={toggleStatus} />
                </div>
            )
        })
    }

    render() {
        let racesInSeason = this.state.races
        if (racesInSeason !== null && racesInSeason.length > 1) {
            return (
                <div className="season">
                    <h2>The {racesInSeason[0].season} Formula 1 Season</h2>
                    {this.listRaces(racesInSeason)}
                </div>
            )
        } else {
            return (
                <div>
                    {
                        this.state.renderLoading
                        ? <Loading />
                        : <p>There was some sort of problem.<br />Maybe try again but it's not looking good. Sorry about that.</p>
                    }
                </div>
            )
        }
    }
}
