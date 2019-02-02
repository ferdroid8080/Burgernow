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

let fullIngredients = []


class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            purchasing: false,
            loadingIngredients: false,
            loadingPurchase: false,
            error: null
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
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0)
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
        this.setState({loadingIngredients: true})

        const ingredientList = [...fullIngredients]

        if (ingredientList.length === 0) { 
            // correr esto solo una vez
            // para evitar duplicidad

            // axios.get('/ingredientes.json')
            // .then(response => {
            //     response.data.map(item => ingredientList.push(item))
            //     fullIngredients = [...ingredientList]
            //     this.setState({
            //         loadingIngredients: false
            //     })
            // })
            // .catch(error => {
            //     this.setState({error: true})
            // })

        } else {
            this.setState({loadingIngredients: false})
        }

    }


    render() {
        const disabledIngredient = {...this.props.ingredients}
        for (let val in disabledIngredient) { // esto convierte el valor de cada propiedad a boolean
            disabledIngredient[val] = disabledIngredient[val] <= 0
        }

        let buildcontrols = null
        if (this.state.loadingIngredients)
            buildcontrols = this.state.error ? <p style={{textAlign: 'center'}}>No es posible cargar el listado de ingredientes</p> : <Spinner />
        else
            buildcontrols = (
                <BuildControls 
                    onAddedIngredient={this.props.onIngredientAdded} onRemovedIngredient={this.props.onIngredientRemoved} 
                    disabled={disabledIngredient} price={this.props.price} purchasable={this.updatePurchasable(this.props.ingredients)} 
                    clicked={this.purchaseHandler} controls={fullIngredients} />
            )


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.props.ingredients} fullIngredients={fullIngredients} price={this.props.price} loading={this.state.loadingPurchase}
                        purchaseCancelledHandler={this.purchaseCancelHandler} purchaseContinuedHandler={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.props.ingredients} />
                {buildcontrols}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (index, ingName) => {
            const ingPrice = fullIngredients[index].price
            return dispatch(burgerBuilderAction.addIngredient(ingName, ingPrice))
        },
        onIngredientRemoved: (index, ingName) => {
            const ingPrice = fullIngredients[index].price
            return dispatch(burgerBuilderAction.removeIngredient(ingName, ingPrice))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessageHandler(BurgerBuilder, axios));