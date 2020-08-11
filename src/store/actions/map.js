import {MAP_ERROR, MAP_SUCCESS_GET, MAP_START_LOAD} from "./actionTypes";
import {searchOnDate} from "../../services/MapService";

export function getFilterMarker(parameters) {
    return (dispatch) => {
        dispatch(MapStartLoading());
        try {
            searchOnDate(parameters)
                .then(data => {
                dispatch(mapsSuccessGet(data));
            })
                .catch(e => dispatch(mapError(e)));
        } catch (e) {
            dispatch(mapError(e));
        }
    }
}

function mapsSuccessGet(markers) {
    return {
        type: MAP_SUCCESS_GET,
        markers,
    };
}

function MapStartLoading() {
    return {
        type: MAP_START_LOAD,
    };
}

function mapError(e) {
    return {
        type: MAP_ERROR,
        error: e,
    }
}