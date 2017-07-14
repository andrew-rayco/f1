import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import {browserHistory} from 'react-router'

import RunRace from './RunRace'
import Home from './Home'
import Header from './Header'
import Circuits from './Circuits'
import FullSeason from './FullSeason'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div className="container">
          <Header />
          <Route path='/' exact={true} component={Home}/>
          <Route path='/circuits' exact={true} component={Circuits}/>
          <Route path='/season/:id' component={FullSeason}/>
        </div>
      </Router>
    )
  }
}

// <Header/>
// <Route path='/circuits' exact={true} component={Circuits}/>
// <Route path='/season/:id' component={FullSeason}/>
