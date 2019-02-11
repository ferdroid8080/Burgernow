import React, { Component } from 'react';

import Stylesheet from './Modal.css';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children // solo si el prop 'show' y children cambian
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
