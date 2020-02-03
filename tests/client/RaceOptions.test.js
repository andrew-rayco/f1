import React from 'react'
import { shallow } from 'enzyme'
import RaceOptions from '../../client/components/RaceOptions'

describe('RaceOptions component', () => {
  const props = {
    race: {
      raceId: 999
    }
  }
  const app = shallow(<RaceOptions race={props} />)

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })
})
