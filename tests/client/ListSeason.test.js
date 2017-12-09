import React from 'react'
import { shallow } from 'enzyme'

import ListSeason from '../../client/components/ListSeason'

describe('ListSeason component', () => {
  const app = shallow(<ListSeason />)

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

  it('contains a single .season div', () => {
    expect(app.find('.season').length).toEqual(1)
  })

  it('contains a link', () => {
    expect(app.find('Link').exists()).toBe(true)
  })
})
