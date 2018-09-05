import React from 'react';

import Stylesheet from './NavItem.css';


const navItem = (props) => (
    <li className={Stylesheet.NavItem}>
        <a href={props.link} className={props.active ? Stylesheet.active : null}>{props.children}</a>
    </li>
)

export default navItem;