import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    if (action.type === actionTypes.AUTH_START) {
        return {
            ...state,
            loading: true
        }
    }
    if (action.type === actionTypes.AUTH_SUCCESS) {
        return {
            ...state,
            loading: false,
            userId: action.userId,
            idToken: action.idToken
        }
    }
    if (action.type === actionTypes.AUTH_FAIL) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    return state
}

export default authReducer;