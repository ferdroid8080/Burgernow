import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4000,
    error: false
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.ADD_INGREDIENT) {
        const updatedIngredients = state.ingredients ? [...state.ingredients] : []
        const itemIndex = updatedIngredients.findIndex(i => i.id === action.ingredientId)
        updatedIngredients[itemIndex].count = updatedIngredients[itemIndex].count ? updatedIngredients[itemIndex].count + 1 : 1
        return {
            ...state,
            ingredients: [
                ...updatedIngredients
            ],
            totalPrice: state.totalPrice + updatedIngredients[itemIndex].price
        }
    }
    if (action.type === actionTypes.REMOVE_INGREDIENT) {
        const updatedIngredients = state.ingredients ? [...state.ingredients] : []
        const itemIndex = updatedIngredients.findIndex(i => i.id === action.ingredientId)
        updatedIngredients[itemIndex].count = updatedIngredients[itemIndex].count ? updatedIngredients[itemIndex].count - 1 : 0 
        return {
            ...state,
            ingredients: [
                ...state.ingredients,
            ],
            totalPrice: state.totalPrice - updatedIngredients[itemIndex].price
        }
    }
    if (action.type === actionTypes.SAVE_INGREDIENT) {
        return {
            ...state,
            ingredients: action.ingredients,
            error: false
        }
    }
    if (action.type === actionTypes.FETCH_INGREDIENT_FAILED) {
        return {
            ...state, 
            error: true
        }
    }
    return state
}

export default reducer;