import React from 'react'

import * as api from '../api'

export default class FullSeason extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount() {
    var location = this.props.location.pathname
    var thisSeason = location.substring(location.lastIndexOf('/') + 1)
    api.getRaces(thisSeason, (races) => {
      this.setState({races})
    })
  }

  render() {
    return (
      <div className="full-season">
        <h1>Hooray you're hitting the FullSeason component!</h1>
        {console.log('woohooo!')}
      </div>
    )
  }
}
