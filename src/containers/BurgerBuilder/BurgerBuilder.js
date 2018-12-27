import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ErrorMessageHandler from '../../hoc/ErrorMessageHandler/ErrorMessageHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

import axios from '../../axios';

let fullIngredients = []


class BurgerBuilder extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            purchasable: false,
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
        for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
        }
        queryParams.push('price=' + this.props.price)
        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }


    componentDidMount() {
        this.setState({loadingIngredients: true})

        const ingredientList = [...fullIngredients]

        if (ingredientList.length === 0) { 
            // correr esto solo una vez
            // para evitar duplicidad

            axios.get('/ingredientes.json')
            .then(response => {
                response.data.map(item => ingredientList.push(item))
                fullIngredients = [...ingredientList]
                this.setState({
                    loadingIngredients: false
                })
            })
            .catch(error => {
                this.setState({error: true})
            })

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
                    disabled={disabledIngredient} price={this.props.price} purchasable={this.state.purchasable} 
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
        onIngredientAdded: (index, ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT, 
            ingredientName: ingName, 
            ingredientPrice: fullIngredients[index].price
        }),
        onIngredientRemoved: (index, ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT, 
            ingredientName: ingName, 
            ingredientPrice: fullIngredients[index].price
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessageHandler(BurgerBuilder, axios));