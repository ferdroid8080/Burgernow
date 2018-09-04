import React from 'react';

import Stylesheet from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={Stylesheet.BuildControl}>
            <div className={Stylesheet.Label}>{props.label}</div>
            <button className={Stylesheet.Less} onClick={props.removed}>Menos</button>
            <button className={Stylesheet.More} onClick={props.added}>Mas</button>
        </div>
    )
}

export default buildControl;