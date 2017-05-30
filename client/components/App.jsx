import React from 'react'

import RunRace from './RunRace'

const App = raceData => {
  return (
    <div>
      <h1>Visualise Race</h1>
        <div className="track">
          <RunRace raceData={raceData.raceData} />
        </div>
    </div>
  )
}



export default App
