import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios';

import * as actions from '../../store/actions/index';

import withErrorHandler from '../../hoc/ErrorMessageHandler/ErrorMessageHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.props.onFetchOrders()
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (
                this.props.orders.map(item => 
                    <Order 
                        key={item.id} 
                        ingredients={item.ingredientes} 
                        price={+item.precio} />
                )
            )
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));