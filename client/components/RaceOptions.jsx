import React from 'react'
import moment from 'moment'

const RaceOptions = ({props, visibility}) => {

  let hidden
  (visibility) ? hidden = 'hidden' : hidden = ''

  function toggleRound(e, raceId) {
    e.preventDefault()
    let raceDetails = document.getElementById(raceId)
    raceDetails.classList.toggle('hidden')
  }

  return (
    <div key={props.raceId} className="row single-round">
      <div className="twelve columns round">
        { (visibility) ?
          <h4 onClick={(e) => toggleRound(e, props.raceId)}><a href="#">Round {props.round} - {props.raceName}</a></h4> :
          <h4>Round {props.round} - {props.raceName}</h4>
        }
        <div id={props.raceId} className={`toggle ${hidden}`}>
          <p>{moment(props.date).format('MMMM Do YYYY')}</p>
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
