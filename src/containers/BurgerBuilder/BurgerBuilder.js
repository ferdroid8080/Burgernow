import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad: 0.7,
    bacon: 1.2,
    cheese: 0.4,
    meat: 1.8
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 3.12,
            purchasable: false,
            purchasing: false
        }

    }

    addIngredientHandler = (type) => {
        const updateIngredients = {...this.state.ingredients}
        updateIngredients[type] += 1
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type]
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchasable(updateIngredients)
    }

    removeIngredientHandler = (type) => {
        const updateCount = this.state.ingredients[type] > 0 ? this.state.ingredients[type] - 1 : 0 
        const updateIngredients = {...this.state.ingredients}
        updateIngredients[type] = updateCount
        const newPrice = this.state.totalPrice > 3.12 ? this.state.totalPrice - INGREDIENTS_PRICE[type] : 3.12
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchasable(updateIngredients)
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({purchasable: sum > 0})
    }

    purchaseHandler = () => { // las arrow function permite usar el contexto this de la clase
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }


    render() {
        const disabledIngredient = {...this.state.ingredients}
        for (let val in disabledIngredient) { // esto convierte el valor de cada propiedad a boolean
            disabledIngredient[val] = disabledIngredient[val] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls onAddedIngredient={this.addIngredientHandler} onRemovedIngredient={this.removeIngredientHandler} 
                    disabled={disabledIngredient} price={this.state.totalPrice} purchasable={this.state.purchasable} clicked={this.purchaseHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;