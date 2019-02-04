import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchaseSaved: false
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.PURCHASE_BURGER_INIT) {
        return updateObject(state, {loading: true})
    }
    if (action.type === actionTypes.PURCHASE_BURGER_SUCCEEDED) {
        const newOrder = updateObject(action.orderData, {id: action.orderId})
        return updateObject(state, {
            loading: false,
            orders: state.orders.concat(newOrder),
            purchaseSaved: true
        })
    }
    if (action.type === actionTypes.PURCHASE_BURGER_FAILED) {
        return updateObject(state, {loading: false})
    }
    if (action.type === actionTypes.PURCHASE_BURGER_SAVED) {
        return updateObject(state, {purchaseSaved: false})
    }

    if (action.type === actionTypes.FETCH_ORDERS_INIT) {
        return updateObject(state, {loading: true})
    }
    if (action.type === actionTypes.FETCH_ORDERS_SUCCEEDED) {
        return updateObject(state, {
            loading: false,
            orders: action.orders
        })
    }
    if (action.type === actionTypes.FETCH_ORDERS_FAILED) {
        return updateObject(state, {loading: false})
    }

    return state
}

export default reducer;