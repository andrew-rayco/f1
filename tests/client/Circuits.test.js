import React from 'react'
import { shallow } from 'enzyme'
import Circuits from '../../client/components/Circuits'

describe('Circuits', () => {
  const mockListCircuits = jest.fn()
  const wrapper = shallow(<Circuits />)
  const circuits = [
    {
      circuitId: 'galvez',
      url:
        'http://en.wikipedia.org/wiki/Aut%C3%B3dromo_Oscar_Alfredo_G%C3%A1lvez',
      circuitName: 'Autódromo Juan y Oscar Gálvez',
      Location: {
        country: 'Argentina',
        locality: 'In the park on the bench',
        lat: '150',
        long: '200'
      }
    },
    {
      circuitId: 'adelaide',
      url: 'http://en.wikipedia.org/wiki/Adelaide_Street_Circuit',
      circuitName: 'Adelaide Street Circuit',
      Location: {
        country: 'Argentina',
        locality: 'In the park on the bench',
        lat: '150',
        long: '200'
      }
    },
    {
      circuitId: 'albert_park',
      url: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
      circuitName: 'Albert Park Grand Prix Circuit',
      Location: {
        country: 'Argentina',
        locality: 'In the park on the bench',
        lat: '150',
        long: '200'
      }
    },
    {
      circuitId: 'BAK',
      url: 'http://en.wikipedia.org/wiki/Baku_City_Circuit',
      circuitName: 'Baku City Circuit',
      Location: {
        country: 'Argentina',
        locality: 'In the park on the bench',
        lat: '150',
        long: '200'
      }
    }
  ]

  beforeEach(() => {
    wrapper.setState({ circuits })
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('contains the `circuit-list` div', () => {
    expect(wrapper.find('.circuit-list').exists()).toBe(true)
    expect(wrapper.find('.circuit-list').length).toEqual(1)
  })

  it('renders an h2 heading and h4 subheading', () => {
    expect(wrapper.find('h2').text()).toEqual('Circuits')
    expect(wrapper.find('h4').text()).toMatch(/Every circuit/)
  })

  it('has a tbody with multiple children', () => {
    expect(wrapper.find('tr').length).toEqual(5)
  })

  it('renders loading component if no data', () => {
    wrapper.setState({ circuits: null })
    expect(wrapper.find('.circuit-list').text()).toMatch(/<Loading \/>/)
  })
})
