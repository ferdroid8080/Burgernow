import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ErrorMessageHandler from '../../hoc/ErrorMessageHandler/ErrorMessageHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios';


class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            fullIngredients: [
                // {id: 1, label: 'Cebolla', type: 'salad', price: 0.7},
                // {id: 2, label: 'Tocino', type: 'bacon', price: 1.2},
                // {id: 3, label: 'Queso', type: 'cheese', price: 0.4},
                // {id: 4, label: 'Carne', type: 'meat', price: 1.8}
            ],
            ingredients: {},
            totalPrice: 4000,
            purchasable: false,
            purchasing: false,
            loadingIngredients: false,
            loadingPurchase: false,
            error: null
        }

    }

    addIngredientHandler = (index, type) => {
        let updateIngredients = {...this.state.ingredients}
        
        if (updateIngredients[type] === undefined) {
            updateIngredients[type] = 1
        } else {
            updateIngredients[type] += 1
        }        
        const newPrice = this.state.totalPrice + this.state.fullIngredients[index].price
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchasable(updateIngredients)
    }

    removeIngredientHandler = (index, type) => {
        let updateCount = this.state.ingredients[type] > 0 ? this.state.ingredients[type] - 1 : 0
        let updateIngredients = {...this.state.ingredients}
        updateIngredients[type] = updateCount
        const newPrice = this.state.totalPrice > 3.12 ? this.state.totalPrice - this.state.fullIngredients[index].price : 3.12
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
        let queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }


    componentDidMount() {
        this.setState({loadingIngredients: true})

        const ingredientList = [...this.state.fullIngredients]

        axios.get('/ingredientes.json')
            .then(response => {
                response.data.map(item => ingredientList.push(item))
                this.setState({
                    loadingIngredients: false,
                    fullIngredients: ingredientList
                })
            })
            .catch(error => {
                this.setState({error: true})
            })
    }


    render() {
        const disabledIngredient = {...this.state.ingredients}
        for (let val in disabledIngredient) { // esto convierte el valor de cada propiedad a boolean
            disabledIngredient[val] = disabledIngredient[val] <= 0
        }

        let buildcontrols = null
        if (this.state.loadingIngredients)
            buildcontrols = this.state.error ? <p style={{textAlign: 'center'}}>No es posible cargar el listado de ingredientes</p> : <Spinner />
        else
            buildcontrols = (
                <BuildControls 
                    onAddedIngredient={this.addIngredientHandler} onRemovedIngredient={this.removeIngredientHandler} 
                    disabled={disabledIngredient} price={this.state.totalPrice} purchasable={this.state.purchasable} 
                    clicked={this.purchaseHandler} controls={this.state.fullIngredients} />
            )


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} fullIngredients={this.state.fullIngredients} price={this.state.totalPrice} loading={this.state.loadingPurchase}
                        purchaseCancelledHandler={this.purchaseCancelHandler} purchaseContinuedHandler={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                {buildcontrols}
            </Aux>
        )
    }
}

export default ErrorMessageHandler(BurgerBuilder, axios);