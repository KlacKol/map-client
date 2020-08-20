import {AUTH_ERROR, AUTH_SUCCESS, AUTH_START_LOAD, AUTH_LOGOUT} from "./actionTypes";
import {deleteRefreshToken, loginUser, registerUser} from "../../services/AuthService";
import {
    clearRefreshToken,
    clearToken, clearUserId,
    getToken,
    setRefreshToken,
    setToken,
    setUserId
} from "../../services/LocalStorageService";
import {history} from "../../helpers/history";
import {PATH_AUTH_LOGIN, PATH_HOME} from "../../routeList";
import jwtDecode from "jwt-decode";

export function logUser(parameters) {
    return (dispatch) => {
        try {
            dispatch(userStartLoading());
            loginUser(parameters)
                .then(({data}) => {
                    setUserId(data.userId);
                    setToken(data.token);
                    setRefreshToken(data.refreshToken);
                    dispatch(authSuccess(data.token));
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
                    setUserId(data.userId);
                    setToken(data.token);
                    setRefreshToken(data.refreshToken);
                    dispatch(authSuccess(data.token));
                    history.push(PATH_HOME)
                })
                .catch(e => dispatch(userError(e)))
        } catch (e) {
            dispatch(userError(e));
        }
    }
}

export function logoutUser() {
    return (dispatch) => {
        try {
            const token = getToken();
            const {userId} = jwtDecode(token);
            deleteRefreshToken(userId)
                .then(() => {
                    clearUserId();
                    clearToken();
                    clearRefreshToken();
                    dispatch(logout());
                    history.push(PATH_AUTH_LOGIN)
                })
                .catch(e => dispatch(userError(e)))
        } catch (e) {
            dispatch(userError(e));
        }
    }
}

function logout() {
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