import {ERROR, MAP_SUCCESS_GET, START_LOAD} from "../actions/actionTypes";

const initialState = {
    markers: [],
    loading: false,
    error: null,
};

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case MAP_SUCCESS_GET:
            return {
                ...state,
                loading: false,
                markers: action.markers
            };
        case START_LOAD:
            return {
                ...state,
                loading: true,
            };
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
