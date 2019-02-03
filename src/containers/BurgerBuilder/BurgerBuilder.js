import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ErrorMessageHandler from '../../hoc/ErrorMessageHandler/ErrorMessageHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderAction from '../../store/actions/index'; // se puede quitar 'index' y automaticamente el archivo index es invocado

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

    addIngredientHandler = (index, type) => {
        // let updateIngredients = {...this.state.ingredients}
        
        // if (updateIngredients[type] === undefined) {
        //     updateIngredients[type] = 1
        // } else {
        //     updateIngredients[type] += 1
        // }        
        // const newPrice = this.state.totalPrice + this.state.fullIngredients[index].price
        // this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        // this.updatePurchasable(updateIngredients)
    }

    removeIngredientHandler = (index, type) => {
        // let updateCount = this.state.ingredients[type] > 0 ? this.state.ingredients[type] - 1 : 0
        // let updateIngredients = {...this.state.ingredients}
        // updateIngredients[type] = updateCount
        // const newPrice = this.state.totalPrice > 3.12 ? this.state.totalPrice - this.state.fullIngredients[index].price : 3.12
        // this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        // this.updatePurchasable(updateIngredients)
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
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }


    componentDidMount() {
        console.log('[DidMount] BurgerBuilder has beend mounted!')
        this.props.onInitIngredients()
    }


    render() {
        let buildcontrols = null, burger = null

        burger = this.props.errorFetchingIngs ? <p>Imposible obtener los ingredientes</p> : <Spinner />

        if (this.props.ingredients) {
            burger = <Burger ingredients={this.props.ingredients} />
            buildcontrols = (
                <BuildControls 
                    onAddedIngredient={this.props.onIngredientAdded} onRemovedIngredient={this.props.onIngredientRemoved} 
                    price={this.props.price} purchasable={this.updatePurchasable(this.props.ingredients)} 
                    clicked={this.purchaseHandler} controls={this.props.ingredients} />
            )
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.props.ingredients} price={this.props.price} loading={this.state.loadingPurchase}
                        purchaseCancelledHandler={this.purchaseCancelHandler} purchaseContinuedHandler={this.purchaseContinueHandler} />
                </Modal>
                {burger}
                {buildcontrols}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
        errorFetchingIngs: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (id) => {
            return dispatch(burgerBuilderAction.addIngredient(id))
        },
        onIngredientRemoved: (id) => {
            return dispatch(burgerBuilderAction.removeIngredient(id))
        },
        onInitIngredients: () => dispatch(burgerBuilderAction.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessageHandler(BurgerBuilder, axios));