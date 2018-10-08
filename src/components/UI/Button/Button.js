import React from 'react';

import Stylesheet from './Button.css';

const button = (props) => (
    <button 
        disabled={props.disabled}
        className={[Stylesheet.Button, Stylesheet[props.btnType]].join(' ')}
        onClick={props.btnClicked}>{props.children}</button>
);

export default button;