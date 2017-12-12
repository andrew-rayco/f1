import React from 'react'

import Loading from '../components/Loading'

export function handleLoadingOrError(data) {
  if (data && data.noData) {
    return (
      <p>Sorry, there is no data here<br/>
      The event is either too old for the data to exist, or too new for this app that is manually updated by an ageing sloth-beast.<br/>
      There may even have been some sort of funky error.<br/>
      Regardless, this doesn't seem to be working right now.</p>
    )
  } else {
    return <Loading />
  }
}
