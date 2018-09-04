import React from 'react';

import Stylesheet from './Modal.css';

const modal = (props) => (
    <div className={Stylesheet.Modal}>
        {props.children}
    </div>
)

export default modal;
