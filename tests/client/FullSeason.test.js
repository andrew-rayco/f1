import React from 'react'
import { shallow, mount } from 'enzyme'
import FullSeason from '../../client/components/FullSeason'

let location = { pathname: "/season/2014" }

describe('FullSeason component', () => {
  let year = 1985
  const app = shallow(<FullSeason location={location} />)

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

  it('only displays once', () => {
    expect(app).toHaveLength(1)
  })
})
