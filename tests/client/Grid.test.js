import React from 'react'
import {shallow } from 'enzyme'

import Grid from '../../client/components/Grid'

describe('Grid component', () => {

  const location = {
    pathname: '0/1/2015/999'
  }
  const app = shallow(<Grid location={ location } />)

  app.setState({
    grid: {
      gridData: [
      {
        year: 1985,
        raceName: 'Australian Grand Prix',
        resultId: 9998
      }, {
        year: 1986,
        raceName: 'Brazilian Grand Prix',
        resultId: 9999
      }]
    }
  })
  //
  // it('renders correctly', () => {
  //   expect(app).toMatchSnapshot()
  // })

  it('passes the damn test', () => {
    expect(app.state).toEqual(1985)
  })
})
