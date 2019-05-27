import React from 'react'
import { shallow } from 'enzyme'

import Home from '../../client/components/Home'

const data = [
  {
    "season": "2010",
    "url": "https://en.wikipedia.org/wiki/2010_Formula_One_season"
  },
  {
    "season": "2011",
    "url": "https://en.wikipedia.org/wiki/2011_Formula_One_season"
  },
  {
    "season": "2012",
    "url": "https://en.wikipedia.org/wiki/2012_Formula_One_season"
  },
  {
    "season": "2013",
    "url": "https://en.wikipedia.org/wiki/2013_Formula_One_season"
  },
  {
    "season": "2014",
    "url": "https://en.wikipedia.org/wiki/2014_Formula_One_season"
  },
  {
    "season": "2015",
    "url": "https://en.wikipedia.org/wiki/2015_Formula_One_season"
  },
  {
    "season": "2016",
    "url": "https://en.wikipedia.org/wiki/2016_Formula_One_season"
  },
  {
    "season": "2017",
    "url": "https://en.wikipedia.org/wiki/2017_Formula_One_season"
  },
  {
    "season": "2018",
    "url": "https://en.wikipedia.org/wiki/2018_Formula_One_World_Championship"
  },
  {
    "season": "2019",
    "url": "https://en.wikipedia.org/wiki/2019_Formula_One_World_Championship"
  }
]

describe('Home component', () => {
    const wrapper = shallow(<Home />)

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('contains a seasons and circuits h3 heading', () => {
        expect(wrapper.find('h3').length).toEqual(2)
        expect(wrapper.find('[data-test="heading-seasons"]').text()).toEqual('Seasons')
        expect(wrapper.find('[data-test="heading-circuits"]').text()).toEqual('Circuits')
    })

    it('renders Loading component if no season data (yet)', () => {
        const component = wrapper.find('ul')
        expect(component.children().length).toEqual(1)
        expect(component.children().text()).toEqual('<Loading />')
    })

    it('renders seasons if given data and does not render Loading component', () => {
        wrapper.setState({ seasons: data })
        const component = wrapper.find('ul')
        expect(component.children().length).toBe(10)
        expect(component.contains('<Loading />')).toBeFalsy()
    })
})
