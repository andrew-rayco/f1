import React from 'react'

const App = raceData => {
  console.log(raceData.raceData);
  return (
    <div>
      <h1>React</h1>
      <div className="race">{showRace(raceData.raceData)}</div>
    </div>
  )
}

function showRace(data) {
  return data.map((driverLap, i) => {
    if (driverLap.lap == 1) {
      return (
        <div>
          <div id={i} className={driverLap.surname}>
            {driverLap.position}: {driverLap.surname}: {driverLap.time}
          </div>
        </div>
      )
    }
  })
  console.log(data[0].lap);
}

export default App
