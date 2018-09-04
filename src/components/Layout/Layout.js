import React from 'react';

import Aux from '../../hoc/Aux';
import Stylesheet from './Layout.css';


const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={Stylesheet.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;