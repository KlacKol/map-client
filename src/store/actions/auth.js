import {AUTH_ERROR, AUTH_SUCCESS, AUTH_START_LOAD, AUTH_LOGOUT} from "./actionTypes";
import {loginUser, registerUser} from "../../services/AuthService";


export function logUser(parameters) {
    return (dispatch) => {
        try {
            dispatch(userStartLoading());
            loginUser(parameters)
                .then(({data}) => {
                    localStorage.setItem('TOKEN', data.token);
                    dispatch(authSuccess(data))
            })
                .catch(e => dispatch(userError(e)))
        } catch (e) {
            dispatch(userError(e));
        }
    }
}

export function regUser(parameters) {
    return (dispatch) => {
        try {
            dispatch(userStartLoading());
            registerUser(parameters)
                .then(({data}) => {
                    localStorage.setItem('TOKEN', data.token);
                    dispatch(authSuccess(data))
                })
                .catch(e => dispatch(userError(e)))
        } catch (e) {
            dispatch(userError(e));
        }
    }
}

export function logout() {
    return {
        type: AUTH_LOGOUT,
    }
}

function authSuccess(user) {
    return {
        type: AUTH_SUCCESS,
        user,
    };
}

function userStartLoading() {
    return {
        type: AUTH_START_LOAD,
    };
}

function userError(e) {
    return {
        type: AUTH_ERROR,
        error: e,
    }
}