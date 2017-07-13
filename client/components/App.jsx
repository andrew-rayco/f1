import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import RunRace from './RunRace'
import Home from './Home'
import * as api from '../api'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  getSeasons() {

  }

  render () {
    return (
      <Router>
        <div className="container">
          <Route path ='/' exact={true} seasons={this.state.seasons} component = {Home} />
        </div>
      </Router>
    )
  }
}

// const App = raceData => {
//   return (
//     <div>
//       <h1>Visualise Race</h1>
//         <div className="track">
//           <RunRace raceData={raceData.raceData} />
//         </div>
//     </div>
//   )
// }
