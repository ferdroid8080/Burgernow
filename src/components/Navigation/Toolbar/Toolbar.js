import React from 'react';

import Stylesheet from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationContainer from '../NavigationContainer/NavigationContainer';


const toolbar = (props) => {
    return (
        <header className={Stylesheet.Toolbar}>
            <div>MENU</div>
            <Logo />
            <nav>
                <NavigationContainer />                
            </nav>
        </header>
    )
}

export default toolbar;