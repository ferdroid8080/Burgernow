import axios from '../../axios-auth';
import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: authData.localId,
        idToken: authData.idToken
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthExpirationTime = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    } 
}

export const auth = (email, passwd, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        let action = 'signupNewUser'
        if (!isSignup) {
            action = 'verifyPassword'
        }
        axios.post(action + '?key=[API_KEY]', {
            email: email,
            password: passwd,
            returnSecureToken: true
        }).then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
                dispatch(checkAuthExpirationTime(response.data.expiresIn))
            })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })
    }
}

