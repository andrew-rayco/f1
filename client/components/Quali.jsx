import React from 'react'

import * as api from '../api'

export default class Quali extends React.Component {
  constructor() {
    super(),
    this.state = {

    }
  }

  componentWillMount() {
    var location = this.props.location.pathname
    var pathArray = location.split('/')
    var season = pathArray[2]
    var raceId = pathArray[3]
    api.getQuali(season, raceId, (qualifyingData) => {
      this.setState({qualifyingData})
    })
    console.log(this.state.qualifyingData)
  }

  render() {
    if (this.state.qualifyingData) {
      {console.log(this.state.qualifyingData)}
      return <h1>We have data</h1>
    } else {
      return <div></div>
    }
  }
}
