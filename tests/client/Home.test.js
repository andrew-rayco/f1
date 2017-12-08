import React from 'react'
import { shallow } from 'enzyme'

import Home from '../../client/components/Home'

describe('Home component', () => {
  let seasons = [
    { year: 1950 },
    { year: 1951 }
  ]
  const app = shallow(<Home />)
  app.setState({ seasons })

  it('passes the damn test', () => {
    expect(3).toEqual(3)
  })
})
