import React from 'react';

import Stylesheet from './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className={Stylesheet.Backdrop} onClick={props.clicked}></div> : null
)

export default backdrop;