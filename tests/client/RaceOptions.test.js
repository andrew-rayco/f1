import React from 'react'
import { shallow, mount } from 'enzyme'
import RaceOptions from '../../client/components/RaceOptions'

describe('RaceOptions component', () => {
  const props = { race: {
    raceId: 999
    }
  }
  const app = shallow(<RaceOptions props={props}/>)


  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

})
