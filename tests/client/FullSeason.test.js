import React from 'react'
import { shallow } from 'enzyme'
import FullSeason from '../../client/components/FullSeason'

let location = { pathname: "/season/2014" }

describe('FullSeason component', () => {
  let year = 1985
  const wrapper = shallow(<FullSeason location={location} />)

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('only displays once', () => {
    expect(wrapper).toHaveLength(1)
  })
})
