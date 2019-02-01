import * as actionTypes from './actionTypes';

export const addIngredient = (name, price) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
        ingredientPrice: price
    }
}

export const removeIngredient = (name, price) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
        ingredientPrice: price
    }
}