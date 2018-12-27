import * as actionTypes from './actions';

const initialState = {
    fullIngredients: [
        // {id: 1, label: 'Cebolla', type: 'salad', price: 0.7},
        // {id: 2, label: 'Tocino', type: 'bacon', price: 1.2},
        // {id: 3, label: 'Queso', type: 'cheese', price: 0.4},
        // {id: 4, label: 'Carne', type: 'meat', price: 1.8}
    ],
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
            }
        }
    }
    if (action.type === actionTypes.REMOVE_INGREDIENT) {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
        }
    }
    return state
}

export default reducer;