import React from 'react';

import Stylesheet from './NavigationContainer.css';
import NavItem from './NavItem/NavItem';



const navigationContainer = (props) => (
    <ul className={Stylesheet.NavigationContainer}>
        <NavItem link="/" active>Personalizala!</NavItem>
        <NavItem link="/">Revisa tu orden</NavItem>
    </ul>
)

export default navigationContainer;