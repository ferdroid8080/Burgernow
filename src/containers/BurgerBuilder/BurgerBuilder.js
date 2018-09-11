import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS = [
    {id: 1, label: 'Cebolla', type: 'salad', price: 0.7},
    {id: 2, label: 'Tocino', type: 'bacon', price: 1.2},
    {id: 3, label: 'Queso', type: 'cheese', price: 0.4},
    {id: 4, label: 'Carne', type: 'meat', price: 1.8}
]

class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            ingredients: {},
            totalPrice: 3.12,
            purchasable: false,
            purchasing: false
        }

    }

    addIngredientHandler = (index, type) => {
        let updateIngredients = {...this.state.ingredients}
        
        if (updateIngredients[type] === undefined) {
            updateIngredients[type] = 1
        } else {
            updateIngredients[type] += 1
        }        
        const newPrice = this.state.totalPrice + INGREDIENTS[index].price
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchasable(updateIngredients)
    }

    removeIngredientHandler = (index, type) => {
        let updateCount = this.state.ingredients[type] > 0 ? this.state.ingredients[type] - 1 : 0
        let updateIngredients = {...this.state.ingredients}
        updateIngredients[type] = updateCount
        const newPrice = this.state.totalPrice > 3.12 ? this.state.totalPrice - INGREDIENTS[index].price : 3.12
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

    purchaseContinueHandler = () => {
        alert('Comtinuar el proceso de compra de la hamburguesa!')
    }


    render() {
        const disabledIngredient = {...this.state.ingredients}
        for (let val in disabledIngredient) { // esto convierte el valor de cada propiedad a boolean
            disabledIngredient[val] = disabledIngredient[val] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}
                        purchaseCancelledHandler={this.purchaseCancelHandler} purchaseContinuedHandler={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls onAddedIngredient={this.addIngredientHandler} onRemovedIngredient={this.removeIngredientHandler} 
                    disabled={disabledIngredient} price={this.state.totalPrice} purchasable={this.state.purchasable} clicked={this.purchaseHandler} controls={INGREDIENTS} />
            </Aux>
        )
    }
}

export default BurgerBuilder;