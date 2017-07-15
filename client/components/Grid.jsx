import React from 'react'

import * as api from '../api'

export default class Grid extends React.Component {
  constructor() {
    super(),
    this.state = {}
  }

  componentWillMount() {
    let location = this.props.location.pathname
    let pathArray = location.split('/')
    let season = pathArray[2]
    let raceId = pathArray[3]
    api.getGrid(season, raceId, (grid) => {
      this.setState({grid})
    })
  }

  render() {
    if (this.state.grid) {
      console.log(this.state.grid)
      return (
        <div className="grid">
          <h2>Congratulations on finding the Grid component</h2>
        </div>
      )
    } else {
      return <div></div>
    }
  }

}
