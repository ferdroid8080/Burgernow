import React from 'react';

import menuIcon from '../../../assets/images/hamburger-menu.png';
import Stylesheet from './Menu.css';


const menuToggler = (props) => {
    return (
        <div className={Stylesheet.Menu} onClick={props.clicked}>
            <img src={menuIcon} alt='Toggle SideDrawer' />
        </div>
    )
}

export default menuToggler;