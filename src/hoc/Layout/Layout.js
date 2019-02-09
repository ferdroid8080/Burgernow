import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    menuClicked={this.sideDrawerOpenedHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={Stylesheet.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);