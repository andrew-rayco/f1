import React from 'react'
import { shallow } from 'enzyme'
import Circuits from '../../client/components/Circuits'

describe('Circuits', () => {
  const mockListCircuits = jest.fn()
  const props = { listCircuits: mockListCircuits }
  const app = shallow(<Circuits {...props} />)
  // const circuits = [
  //   {
  //     "circuitId":25,
  //     "circuitRef":"galvez",
  //     "name":"Autódromo Juan y Oscar Gálvez",
  //     "location":"Buenos Aires",
  //     "country":"Argentina",
  //     "lat":-34.6943,
  //     "lng":-58.4593,
  //     "alt":null,
  //     "url":"http://en.wikipedia.org/wiki/Aut%C3%B3dromo_Oscar_Alfredo_G%C3%A1lvez"
  //   },
  //   {
  //     "circuitId":1,
  //     "circuitRef":"albert_park",
  //     "name":"Albert Park Grand Prix Circuit",
  //     "location":"Melbourne",
  //     "country":"Australia",
  //     "lat":-37.8497,
  //     "lng":144.968,
  //     "alt":10,
  //     "url":"http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit"
  //   }
  // ]

  // beforeEach(() => {
  //   app.setState({circuits})
  // })

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

  it('contains the `circuit-list` div', () => {
    expect(app.find('.circuit-list').exists()).toBe(true)
  })

  // it('has a tbody with multiple children', () => {
  //   expect(app.find('tr').length).toBeGreaterThan(10)
  // })

  // it('mock setTimeout test', () => {
  //  jest.useFakeTimers();
  //  setTimeout(() => {
  //    expect(app.state.circuits.length).toBeGreaterThan(10);
  //  }, 500);
  //  jest.runAllTimers();
  // });

  it('starts with state.circuits null', () => {
    expect(app.state.circuits).toEqual(undefined)
  })

})
