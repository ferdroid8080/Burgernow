import React, { Component } from 'react';

import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';


const errorMessage = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })

            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={() => this.setState({error: null})}>
                        <div style={{textAlign: 'center'}}>
                            <h3>¡Oops! Algo salio mal</h3>
                            <p>{this.state.error ? this.state.error.message : ''}</p>
                        </div>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default errorMessage;