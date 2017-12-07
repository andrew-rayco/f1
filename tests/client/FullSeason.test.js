import React from 'react'
import { shallow, mount } from 'enzyme'
import FullSeason from '../../client/components/FullSeason'

describe('FullSeason component', () => {
  let location = { pathname: "/season/2014" }
  let year = 1985
  const app = shallow(<FullSeason location={location} />)

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })


})
