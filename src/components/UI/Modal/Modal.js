import React, { Component } from 'react';

import Stylesheet from './Modal.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[shoudlComponentUpdate] Modal')
        return nextProps.show !== this.props.show // solo si el prop 'show' cambia
    }

    componentWillUpdate() {
        console.log('[WillUpdate] Modal')
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                    }}
                    className={Stylesheet.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
} 

export default Modal;
