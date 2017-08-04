import React from 'react'

const RaceOptions = ({props, visibility}) => {

  let hidden
  (visibility) ? hidden = 'hidden' : null
  let raceDetails = document.getElementsByClassName('toggle')

  function toggleRound(e, round) {
    e.preventDefault()
    raceDetails[round - 1].classList.toggle('hidden')
  }

  return (
    <div key={props.raceId} className="row single-round">
      <div className="twelve columns round">
        <h4 onClick={(e) => toggleRound(e, props.round)}><a href="#">Round {props.round} - {props.raceName}</a></h4>
        <div className={`toggle ${hidden}`}>
          <p>{props.date}</p>
          <p><a href={`/#/season/${props.year}/${props.raceId}/qualifying`}>Qualifying results</a></p>
          <p><a href={`/#/season/${props.year}/${props.raceId}/grid`}>Starting grid</a></p>
          <p><a href={`/#/season/${props.year}/${props.raceId}/visualise`}>Visualise</a></p>
          <p><a href={`/#/season/${props.year}/${props.raceId}/results`}>Results</a></p>
          <p><a href={props.raceUrl}>{props.year} {props.raceName} on Wikipedia</a></p>
          <div className="separator"></div>
        </div>
      </div>
    </div>
  )
}

module.exports = RaceOptions
