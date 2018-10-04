import React, { Component } from 'react';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';

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

    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} clickedCancel={this.checkoutCancelHandler.bind(this)} clickedContinue={this.checkoutContinueHandler.bind(this)} />
            </div>
        )
    }
}

export default Checkout;