import {AUTH_ERROR, AUTH_SUCCESS, AUTH_START_LOAD} from "./actionTypes";
import {loginUser} from "../../services/AuthService";


export function logUser(parameters) {
    return (dispatch) => {
        try {
            dispatch(userStartLoading());
            loginUser(parameters)
                .then(({data}) => {
                dispatch(authSuccess(data))
            })
                .catch(e => dispatch(userError(e)))
        } catch (e) {
            dispatch(userError(e));
        }
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