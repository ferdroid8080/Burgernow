import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Aux from '../../hoc/Aux/Aux';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        let updatedIngredients = {}
        let price = 0
        for (let params of query.entries()) {
            if (params[0] === 'price') {
                price = params[1]
            } else {
                updatedIngredients[params[0]] = +params[1]
            }
            
        }
        this.setState({ingredients: updatedIngredients, totalPrice: price})
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.push(this.props.match.url + '/contact-data')
    }

    render() {
        let checkout = null
        if ( Object.keys(this.state.ingredients).length > 0 ) {
            checkout = (
                <Aux>
                    <CheckoutSummary ingredients={this.state.ingredients} clickedCancel={this.checkoutCancelHandler.bind(this)} clickedContinue={this.checkoutContinueHandler.bind(this)} />
                    <Route path={this.props.match.url + '/contact-data'} render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />} />
                </Aux>
            )
        } else {
            checkout = <h2 style={{textAlign: 'center'}}>Te sugiero armar primero tu hamburguesa deseada</h2>
        }

        return (
            <div>
                {checkout}
            </div>
        )
    }
}

export default Checkout;