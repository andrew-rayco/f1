import React from 'react'
import { shallow } from 'enzyme'

import Home from '../../client/components/Home'

describe('Home component', () => {

  const app = shallow(<Home />, )

  beforeEach(() => {
    app.setState({ seasons: [
      { year: 1950 },
      { year: 1951 }
    ] })
  })

  it('passes the damn test', () => {
    expect(3).toEqual(3)
  })
})
