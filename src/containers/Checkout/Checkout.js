import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Aux from '../../hoc/Aux/Aux';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data')
    }

    render() {
        let checkout = null, ings = null
        ings = this.props.ingredients ? this.props.ingredients.filter(i => i.count && i.count > 0) : null
        if (ings && ings.length > 0) {
            checkout = (
                <Aux>
                    <CheckoutSummary 
                        ingredients={this.props.ingredients} 
                        clickedCancel={this.checkoutCancelHandler.bind(this)} 
                        clickedContinue={this.checkoutContinueHandler.bind(this)} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </Aux>
            )    
        } else {
            checkout = <Redirect to='/' />
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