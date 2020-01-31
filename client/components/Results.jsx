import React from "react"

import * as apiRoutes from "../../server/apiRoutes"
import * as h from "../helpers/helpers"

export default class Results extends React.Component {
    constructor() {
        super(),
            (this.state = {
                lapTimesExist: false
            })
    }

    UNSAFE_componentWillMount() {
        let season = this.props.season
        let round = this.props.round

        apiRoutes.getResults(season, round, results => {
            let lapTimesExist = false
            console.log(results)

            if (
                results[0].FastestLap.Time &&
                results[0].FastestLap.Time !== "-"
            ) {
                lapTimesExist = true
            }
            this.setState({
                results,
                lapTimesExist,
                raceYear: results.raceYear || season,
                raceName: results.raceName
            })
        })
    }

    listResults(results) {
        let fastestLap = this.findFastestLap(results)
        return results.map(driverResult => {
            const {
                surname,
                forename,
                position,
                driverUrl,
                constructorUrl,
                constructorName,
                positionText,
                raceTime,
                status,
                laps,
                fastestLapTime,
                fastestLapNumber
            } = driverResult

            return (
                <tr key={surname + position}>
                    <td className="position">
                        <strong>{position}</strong>
                    </td>
                    <td>
                        <a href={driverUrl}>
                            {forename} {surname}
                        </a>
                    </td>
                    <td>
                        <a href={constructorUrl}>{constructorName}</a>
                    </td>
                    <td>
                        {positionText != "R" ? (
                            raceTime || status
                        ) : (
                            <div>
                                {status}
                                <span className="muted sub-text">
                                    {Number(laps) + 1}
                                </span>
                            </div>
                        )}
                    </td>
                    {this.state.lapTimesExist && (
                        <td className="optional">
                            {this.highlightFastestLap(
                                fastestLapTime,
                                fastestLap
                            )}
                            {/* show fastestLapNumber next to fastest lap */}
                            <span className="muted sub-text">
                                {fastestLapNumber && `${fastestLapNumber}`}
                            </span>
                        </td>
                    )}
                </tr>
            )
        })
    }

    statusResult(status, laps) {
        return (
            <div>
                {status}
                <span className="muted sub-text">{laps}</span>
            </div>
        )
    }

    findFastestLap(results) {
        let fastestLapTime
        let fastestLapSpeed = 0
        results.map(result => {
            if (
                result.fastestLapSpeed &&
                result.fastestLapSpeed >= fastestLapSpeed
            ) {
                fastestLapSpeed = result.fastestLapSpeed
                fastestLapTime = result.fastestLapTime
            }
        })
        return fastestLapTime
    }

    highlightFastestLap(laptime, fastestLap) {
        if (laptime) {
            if (laptime != fastestLap) {
                return laptime
            } else {
                return <strong>{laptime}</strong>
            }
        } else {
            return "-"
        }
    }

    buildResultsTable() {
        const { raceYear, results } = this.state
        const { raceName } = this.props

        return (
            <div className="content">
                <h2>
                    {raceYear} {raceName}
                </h2>
                <h3>Race results</h3>
                <p>{results[0].laps} laps</p>
                <table>
                    <thead>
                        <tr>
                            <th className="position">
                                {document.body.clientWidth < 450
                                    ? "Pos"
                                    : "Position"}
                            </th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Race Time</th>
                            {this.state.lapTimesExist ? (
                                <th className="optional">Fastest lap</th>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody>{this.listResults(this.state.results)}</tbody>
                </table>
            </div>
        )
    }

    render() {
        const results = this.state.results

        if (!this.state.raceYear) {
            return (
                <div>
                    <p>No data. Sorry.</p>
                </div>
            )
        } else {
            return (
                <div className="results sub-section">
                    {results && !results.noData
                        ? this.buildResultsTable()
                        : h.handleLoadingOrError(results)}
                </div>
            )
        }
    }
}
