import React from 'react'
import { shallow } from 'enzyme'

import Grid from '../../client/components/Grid'

describe('Grid component', () => {

    const location = {
        pathname: '0/1/2015/2'
    }

    const wrapper = shallow(<Grid location={ location } />)

    wrapper.setState({
        grid: {
            gridData: [{
                year: 1985,
                raceName: 'Australian Grand Prix',
                resultId: 9998
            }, {
                year: 1986,
                raceName: 'Brazilian Grand Prix',
                resultId: 9999
            }]
        }
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders returned data', () => {
        expect(wrapper.find('tr').length).toEqual(3)
    })
})
