import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
            totalPrice: 6
        }

    }

    addIngredientHandler = (type) => {
        const updateIngredients = {...this.state.ingredients}
        updateIngredients[type] += 1
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type]
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
    }

    removeIngredientHandler = (type) => {
        const updateCount = this.state.ingredients[type] > 0 ? this.state.ingredients[type] - 1 : 0 
        const updateIngredients = {...this.state.ingredients}
        updateIngredients[type] = updateCount
        const newPrice = this.state.totalPrice > 6 ? this.state.totalPrice - INGREDIENTS_PRICE[type] : 6
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
    }


    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls onAddedIngredient={this.addIngredientHandler} onRemovedIngredient={this.removeIngredientHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;