import React from 'react'

import RunRace from './RunRace'
const App = raceData => {
  return (
    <div>
      <h1>Visualise</h1>
      <RunRace raceData={raceData.raceData} />
    </div>
  )
}



export default App
