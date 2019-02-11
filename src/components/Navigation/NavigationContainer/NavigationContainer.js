import React from 'react';

import Stylesheet from './NavigationContainer.css';
import NavItem from './NavItem/NavItem';



const navigationContainer = (props) => (
    <ul className={Stylesheet.NavigationContainer} onClick={props.closed}>
        <NavItem link="/" exact>Personalizala!</NavItem>
        {props.isAuthenticated ? <NavItem link="/orders">Pedidos</NavItem> : null}
        {!props.isAuthenticated
            ? <NavItem link="/auth">Autenticarse</NavItem>
            : <NavItem link="/logout">Salir</NavItem>
        }
        
    </ul>
)

export default navigationContainer;