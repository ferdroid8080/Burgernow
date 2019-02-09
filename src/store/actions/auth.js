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
        authData: authData
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, passwd, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        let action = 'signupNewUser'
        if (!isSignup) {
            action = 'verifyPassword'
        }
        axios.post(action + '?key=AIzaSyAgrMnWoDhrkbzXPBQ9DOzicmu74_XqHqc', {
            email: email,
            password: passwd,
            returnSecureToken: true
        }).then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
            })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err))
        })
    }
}

