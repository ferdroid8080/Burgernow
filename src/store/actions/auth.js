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

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(response.data))
                dispatch(checkAuthExpirationTime(response.data.expiresIn))
            })
        .catch(err => {
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            const userId = localStorage.getItem('userId')
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess({localId: userId, idToken: token}))
                dispatch(checkAuthExpirationTime((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}