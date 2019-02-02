import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addIngredient = (id) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientId: id
    }
}

export const removeIngredient = (id) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientId: id
    }
}

export const saveIngredients = (ingredients) => {
    return {
        type: actionTypes.SAVE_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredientes.json')
        .then(response => {
            dispatch(saveIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientFailed())
        })
    }
}