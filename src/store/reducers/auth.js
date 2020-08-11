import {AUTH_SUCCESS, AUTH_ERROR, AUTH_START_LOAD} from "../actions/actionTypes";

const initialState = {
    user: {},
    loading: false,
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user
            };
        case AUTH_START_LOAD:
            return {
                ...state,
                loading: true,
            };
        case AUTH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
