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
            })
            .catch(error => {
                dispatch(purcharseBurgerFail(error))
            })
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCEEDED,
        orders: orders
    }
}


export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export  const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit())
        axios.get('/pedidos.json')
            .then(res => {
                const fetchedOrders = []
                for (let k in res.data) {
                    fetchedOrders.push({
                        ...res.data[k],
                        id: k
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}
