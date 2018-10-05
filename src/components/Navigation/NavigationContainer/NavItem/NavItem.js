import React from 'react';
import { NavLink } from 'react-router-dom';

import Stylesheet from './NavItem.css';


const navItem = (props) => (
    <li className={Stylesheet.NavItem}>
        <NavLink to={props.link} exact={props.exact} activeClassName={Stylesheet.active}>{props.children}</NavLink>
    </li>
)

export default navItem;