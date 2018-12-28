import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Aux from '../../hoc/Aux/Aux';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.push(this.props.match.url + '/contact-data')
    }

    render() {
        let checkout = null
        if ( Object.keys(this.props.ingredients).length > 0 ) {
            checkout = (
                <Aux>
                    <CheckoutSummary ingredients={this.props.ingredients} clickedCancel={this.checkoutCancelHandler.bind(this)} clickedContinue={this.checkoutContinueHandler.bind(this)} />
                    <Route component={ContactData} />
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);