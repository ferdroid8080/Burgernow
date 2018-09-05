import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import Stylesheet from './Logo.css';


const logoApp = (props) => (
    <div className={Stylesheet.Logo}>
        <img src={burgerLogo} alt="Burgernow!" />
    </div>
)

export default logoApp;