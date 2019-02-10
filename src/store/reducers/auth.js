import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    setAuthRedirectPath: '/'
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
            error: null,
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
    if (action.type === actionTypes.AUTH_LOGOUT) {
        return {
            ...state,
            userId: null,
            idToken: null
        }
    }
    if (action.type === actionTypes.SET_AUTH_REDIRECT_PATH) {
        return {
            ...state,
            setAuthRedirectPath: action.path
        }
    }
    return state
}

export default authReducer;