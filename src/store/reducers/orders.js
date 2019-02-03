import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.PURCHASE_BURGER_INIT) {
        return {
            ...state,
            loading: true
        }
    }
    if (action.type === actionTypes.PURCHASE_BURGER_SUCCEEDED) {
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }
        return {
            ...state,
            loading: false,
            orders: state.orders.concat(newOrder)
        }
    }
    if (action.type === actionTypes.PURCHASE_BURGER_FAILED) {
        return {
            ...state,
            loading: false
        }
    }
    return state
}

export default reducer;