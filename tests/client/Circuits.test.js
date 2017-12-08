import React from 'react'
import { shallow } from 'enzyme'
import Circuits from '../../client/components/Circuits'

describe('Circuits', () => {
  const mockListCircuits = jest.fn()
  // const props = { listCircuits: mockListCircuits }
  const app = shallow(<Circuits />)
  const circuits = [
    {
      "circuitId":25
    },
    {
      "circuitId":1
    }
  ]

  beforeEach(() => {
    app.setState({circuits})
  })

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

  it('contains the `circuit-list` div', () => {
    expect(app.find('.circuit-list').exists()).toBe(true)
  })

  it('has a tbody with multiple children', () => {
    expect(app.find('tr').length).toEqual(3)
  })

  it('starts with state.circuits null', () => {
    expect(app.state.circuits).toEqual(undefined)
  })

})
