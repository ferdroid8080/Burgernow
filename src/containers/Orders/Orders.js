import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios';

import withErrorHandler from '../../hoc/ErrorMessageHandler/ErrorMessageHandler';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/pedidos.json')
            .then(res => {
                const fetchedOrders = []
                for (let k in res.data) {
                    fetchedOrders.push({
                        ...res.data[k],
                        id: k
                    })
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {
        const orders = this.state.orders

        return (
            <div>
                {orders.map(item => 
                    <Order 
                        key={item.id} 
                        ingredients={item.ingredientes} 
                        price={+item.precio} />
                )}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);