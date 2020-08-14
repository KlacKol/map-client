import {AUTH_ERROR, AUTH_SUCCESS, AUTH_START_LOAD, AUTH_LOGOUT} from "./actionTypes";
import {loginUser, registerUser} from "../../services/AuthService";
import {clearToken, getToken, setToken} from "../../services/LocalStorageService";
import {history} from "../../helpers/history";
import {PATH_HOME} from "../../routeList";
import jwtDecode from 'jwt-decode';

export function logUser(parameters) {
    return (dispatch) => {
        try {
            dispatch(userStartLoading());
            loginUser(parameters)
                .then(({data}) => {
                    setToken(data);
                    const user = jwtDecode(getToken());
                    dispatch(authSuccess(user));
                    history.push(PATH_HOME)
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
                    setToken(data.token);
                    dispatch(authSuccess(data));
                    history.push(PATH_HOME)
                })
                .catch(e => dispatch(userError(e)))
        } catch (e) {
            dispatch(userError(e));
        }
    }
}

export function logout() {
    clearToken();
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