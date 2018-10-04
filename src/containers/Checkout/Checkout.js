import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {}
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        let updatedIngredients = {}
        for (let params of query.entries()) {
            updatedIngredients[params[0]] = +params[1]
        }
        this.setState({ingredients: updatedIngredients})
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.push(this.props.match.url + '/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} clickedCancel={this.checkoutCancelHandler.bind(this)} clickedContinue={this.checkoutContinueHandler.bind(this)} />
                <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;