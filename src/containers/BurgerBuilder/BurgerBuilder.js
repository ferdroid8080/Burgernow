import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ErrorMessageHandler from '../../hoc/ErrorMessageHandler/ErrorMessageHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index'; // se puede quitar 'index' y automaticamente el archivo index es invocado

import axios from '../../axios';


class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            purchasing: false,
            loadingIngredients: false,
            loadingPurchase: false
        }

    }

    updatePurchasable = (ingredients) => {
        let sum = 0
        if (ingredients) {
            sum = ingredients
                .map(i => i.count ? i.count : 0)
                .reduce((prev, acc) => prev + acc)
        }
        return sum > 0
    }

    purchaseHandler = () => { // las arrow function permite usar el contexto this de la clase
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseSaved() // resetear la compra
        this.props.history.push('/checkout')
    }


    componentDidMount() {
        this.props.onInitIngredients()
    }


    render() {
        let burger = null

        burger = this.props.errorFetchingIngs ? <p>Imposible obtener los ingredientes</p> : <Spinner />

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        isAuth={this.props.isAuthenticated}
                        onAddedIngredient={this.props.onIngredientAdded} onRemovedIngredient={this.props.onIngredientRemoved} 
                        price={this.props.price} purchasable={this.updatePurchasable(this.props.ingredients)} 
                        clicked={this.purchaseHandler} controls={this.props.ingredients} />
                </Aux>
            )
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.props.ingredients} price={this.props.price} loading={this.state.loadingPurchase}
                        purchaseCancelledHandler={this.purchaseCancelHandler} purchaseContinuedHandler={this.purchaseContinueHandler} />
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        errorFetchingIngs: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (id) => dispatch(actions.addIngredient(id)),
        onIngredientRemoved: (id) => dispatch(actions.removeIngredient(id)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseSaved: () => dispatch(actions.purchaseSaved()), // se resetea la compra
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessageHandler(BurgerBuilder, axios));