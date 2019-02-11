import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationContainer from './NavigationContainer';
import NavItem from './NavItem/NavItem';

configure({adapter: new Adapter()})

describe('<NavigationContainer />', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = shallow(<NavigationContainer />)
    })

    it('deberia renderizar dos elementos de tipo <NavigationContainer /> si no esta autenticado', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2)
    })

    it('deberia renderizar tres elementos de tipo <NavigationContainer /> si esta autenticado', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavItem)).toHaveLength(3)
    })
})