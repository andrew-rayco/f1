import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../client/components/Header'

describe('Header', () => {
  let props = { location: {pathname:"/season/2014"}}
  const app = shallow(<Header {...props} />)

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

  it('contains an h1', () => {
    expect(app.find('h1').exists()).toBe(true)
  })

  it('contains an h1 with the correct text', () => {
    expect(app.find('h1').text()).toEqual('F1ian')
  })

  it('contains a .main-header div', () => {
    expect(app.find('.main-header').exists()).toBe(true)
  })
})
