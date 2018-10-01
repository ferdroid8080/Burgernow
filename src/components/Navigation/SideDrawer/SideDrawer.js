import React from 'react';

import Logo from '../Logo/Logo';
import NavigationContainer from '../NavigationContainer/NavigationContainer';
import Stylesheet from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';


const sideDrawer = (props) => {
    const showSideDrawerStyles = [Stylesheet.SideDrawer]
    if (props.open) {
        showSideDrawerStyles.push(Stylesheet.Open)
    } else {
        showSideDrawerStyles.push(Stylesheet.Close)
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={showSideDrawerStyles.join(' ')}>
                <div className={Stylesheet.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationContainer />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;