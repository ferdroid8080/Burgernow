import React from 'react';

import Stylesheet from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={Stylesheet.BuildControl}>
            <div className={Stylesheet.Label}>{props.label}</div>
            <button className={Stylesheet.Less}>Menos</button>
            <button className={Stylesheet.More}>Mas</button>
        </div>
    )
}

export default buildControl;