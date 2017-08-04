import React from 'react'
import moment from 'moment'

const RaceOptions = ({quali, visibility}) => {

  let hidden
  (visibility) ? hidden = 'hidden' : hidden = ''

  function toggleRound(e, raceId) {
    e.preventDefault()
    let raceDetails = document.getElementById(raceId)
    raceDetails.classList.toggle('hidden')
  }

  return (
    <div key={quali.raceId} className="row single-round">
      <div className="twelve columns round">
        <h4 onClick={(e) => toggleRound(e, quali.raceId)}><a href="#">Round {quali.round} - {quali.raceName}</a></h4>
        <div id={quali.raceId} className={`toggle ${hidden}`}>
          <p>{moment(quali.date).format('MMMM Do YYYY')}</p>
          <p><a href={`/#/season/${quali.year}/${quali.raceId}/qualifying`}>Qualifying results</a></p>
          <p><a href={`/#/season/${quali.year}/${quali.raceId}/grid`}>Starting grid</a></p>
          <p><a href={`/#/season/${quali.year}/${quali.raceId}/visualise`}>Visualise</a></p>
          <p><a href={`/#/season/${quali.year}/${quali.raceId}/results`}>Results</a></p>
          <p><a href={quali.raceUrl}>{quali.year} {quali.raceName} on Wikipedia</a></p>
          <div className="separator"></div>
        </div>
      </div>
    </div>
  )
}

module.exports = RaceOptions
