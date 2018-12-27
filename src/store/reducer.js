import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4000,
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.ADD_INGREDIENT) {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + action.ingredientPrice
        }
    }
    if (action.type === actionTypes.REMOVE_INGREDIENT) {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - action.ingredientPrice
        }
    }
    return state
}

export default reducer;