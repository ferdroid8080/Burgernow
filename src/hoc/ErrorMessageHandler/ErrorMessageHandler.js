import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';


const errorMessage = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            console.log('[WillMount] errorMessage')
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })

            this.resInterceptor =  axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
            console.log('[WillUnmount]', this.reqInterceptor, this.resInterceptor)
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