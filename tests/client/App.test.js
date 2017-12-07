import React from 'react'
import { shallow, mount } from 'enzyme'
import App from '../../client/components/App'

describe('App', () => {
  let props = { location: { pathname: '1/2/3/4/5'}, year: 1985 }
  const app = shallow(<App {...props} />)

  it('renders correctly', () => {
    expect(app).toMatchSnapshot()
  })

  it('only displays once', () => {
    expect(app).toHaveLength(1)
  })

  it('contains a container div', () => {
    expect(app.find('.container').exists()).toBe(true)
  })
})
