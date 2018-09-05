import React from 'react';

import Stylesheet from './Toolbar.css';


const toolbar = (props) => {
    return (
        <header className={Stylesheet.Toolbar}>
            <div>MENU</div>
            <div>LOGO</div>
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