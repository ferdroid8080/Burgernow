import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Stylesheet from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }


    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true})
    }

    render () {
        return (
            <Aux>
                <Toolbar menuClicked={this.sideDrawerOpenedHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={Stylesheet.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;