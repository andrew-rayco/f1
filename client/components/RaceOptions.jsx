import React from 'react'

const RaceOptions = ({props}) => {
  return (
    <div key={props.raceId} className="row single-round">
      <div className="twelve columns round">
        <h3><a href="#">Round {props.round} - {props.raceName}</a></h3>
        <div className="toggle">
          <p>{props.date}</p>
          <p><a href={`/#/season/${props.year}/${props.raceId}/qualifying`}>Qualifying results</a></p>
          <p><a href={`/#/season/${props.year}/${props.raceId}/grid`}>Starting grid</a></p>
          <p><a href={`/#/season/${props.year}/${props.raceId}/visualise`}>Visualise</a></p>
          <p><a href={`/#/season/${props.year}/${props.raceId}/results`}>Results</a></p>
          <p><a href={props.raceUrl}>{props.year} {props.raceName} on Wikipedia</a></p>
        </div>
      </div>
    </div>
  )
}

module.exports = RaceOptions
