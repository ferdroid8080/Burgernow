import React from 'react';

import Stylesheet from './NavigationContainer.css';
import NavItem from './NavItem/NavItem';



const navigationContainer = (props) => (
    <ul className={Stylesheet.NavigationContainer}>
        <NavItem link="/" exact>Personalizala!</NavItem>
        <NavItem link="/orders">Pedidos</NavItem>
    </ul>
)

export default navigationContainer;