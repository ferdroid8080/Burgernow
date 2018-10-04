import React from 'react';

import Stylesheet from './NavigationContainer.css';
import NavItem from './NavItem/NavItem';



const navigationContainer = (props) => (
    <ul className={Stylesheet.NavigationContainer}>
        <NavItem link="/builder">Personalizala!</NavItem>
        <NavItem link="/checkout">Revisa tu orden</NavItem>
    </ul>
)

export default navigationContainer;