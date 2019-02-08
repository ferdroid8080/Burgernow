import React from 'react';

import Stylesheet from './NavigationContainer.css';
import NavItem from './NavItem/NavItem';



const navigationContainer = (props) => (
    <ul className={Stylesheet.NavigationContainer}>
        <NavItem link="/" exact>Personalizala!</NavItem>
        <NavItem link="/orders">Pedidos</NavItem>
        <NavItem link="/auth">Autenticarse</NavItem>
    </ul>
)

export default navigationContainer;