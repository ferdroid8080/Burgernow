import React from 'react';

import Stylesheet from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationContainer from '../NavigationContainer/NavigationContainer';
import MenuToggler from '../../UI/Menu/Menu';


const toolbar = (props) => {
    return (
        <header className={Stylesheet.Toolbar}>
            <MenuToggler clicked={props.menuClicked} />
            <Logo />
            <nav>
                <NavigationContainer />                
            </nav>
        </header>
    )
}

export default toolbar;