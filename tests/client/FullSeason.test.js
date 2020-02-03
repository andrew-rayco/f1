import React from 'react'
import { shallow } from 'enzyme'
import FullSeason from '../../client/components/FullSeason'

let location = { pathname: '/season/2014' }

const races = [
  {
    season: '2019',
    round: '1',
    url: 'https://en.wikipedia.org/wiki/2019_Australian_Grand_Prix',
    raceName: 'Australian Grand Prix',
    Circuit: {
      circuitId: 'albert_park',
      url: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
      circuitName: 'Albert Park Grand Prix Circuit',
      Location: {
        lat: '-37.8497',
        long: '144.968',
        locality: 'Melbourne',
        country: 'Australia'
      }
    },
    date: '2019-03-17',
    time: '05:10:00Z'
  },
  {
    season: '2019',
    round: '2',
    url: 'https://en.wikipedia.org/wiki/2019_Bahrain_Grand_Prix',
    raceName: 'Bahrain Grand Prix',
    Circuit: {
      circuitId: 'bahrain',
      url: 'http://en.wikipedia.org/wiki/Bahrain_International_Circuit',
      circuitName: 'Bahrain International Circuit',
      Location: {
        lat: '26.0325',
        long: '50.5106',
        locality: 'Sakhir',
        country: 'Bahrain'
      }
    },
    date: '2019-03-31',
    time: '15:10:00Z'
  },
  {
    season: '2019',
    round: '3',
    url: 'https://en.wikipedia.org/wiki/2019_Chinese_Grand_Prix',
    raceName: 'Chinese Grand Prix',
    Circuit: {
      circuitId: 'shanghai',
      url: 'http://en.wikipedia.org/wiki/Shanghai_International_Circuit',
      circuitName: 'Shanghai International Circuit',
      Location: {
        lat: '31.3389',
        long: '121.22',
        locality: 'Shanghai',
        country: 'China'
      }
    },
    date: '2019-04-14',
    time: '06:10:00Z'
  }
]

describe('FullSeason component', () => {
  const wrapper = shallow(<FullSeason location={location} />)

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('only renders once', () => {
    expect(wrapper).toHaveLength(1)
  })

  it('renders Loading component when no data (yet)', () => {
    wrapper.setState({ renderLoading: true })
    const component = wrapper.find('.load-error')
    expect(component).toBeTruthy()
    expect(component.text()).toMatch(/<Loading \/>/)
  })

  it('contains a h2 title including the correct year', () => {
    wrapper.setState({ races })
    const component = wrapper.first('h2')
    expect(component.length).toEqual(1)
    expect(component.text()).toMatch(/The 2019 Formula 1 Season/)
  })
})
