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

// import Season from './Season.jsx'
// import * as api from 'api'
// class SeasonList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state {
//       seasons: []
//     }
//   }
//
//   onComponentDidMount() {
//     api.getSeasons(seasons => this.setState({seasons: seasons}))
//   }
//
//   render() {
//     return (
//       <div>
//         {this.state.seasons.map(season => <Season {...season} />)
//       </div>
//     )
//   }
// }



export default App
