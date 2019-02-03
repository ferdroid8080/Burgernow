import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCEEDED,
        orderId: id,
        orderData: orderData
    }
}

export const purcharseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const purchaseSaved = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_SAVED
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerInit())
        axios.post('/pedidos.json', orderData)
            .then(response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
                dispatch(purchaseSaved())
            })
            .catch(error => {
                dispatch(purcharseBurgerFail(error))
            })
    }
}