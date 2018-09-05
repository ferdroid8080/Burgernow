import React from 'react';

import Stylesheet from './Toolbar.css';
import Logo from '../Logo/Logo';


const toolbar = (props) => {
    return (
        <header className={Stylesheet.Toolbar}>
            <div>MENU</div>
            <Logo />
            <nav>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </nav>
        </header>
    )
}

export default toolbar;