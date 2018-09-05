import React from 'react';

import Aux from '../../hoc/Aux';
import Stylesheet from './Layout.css';

import Toolbar from '../Toolbar/Toolbar';


const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={Stylesheet.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;