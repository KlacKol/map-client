import {ERROR, MAP_SUCCESS_GET, START_LOAD} from "./actionTypes";
import {getAllMarker} from "../../services/MapService";

export function getMaps() {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const data = await getAllMarker();
            dispatch(mapsSuccessGet(data))
        } catch (e) {
            dispatch(mapError(e));
        }
    }
}

export function mapsSuccessGet(markers) {
    return {
        type: MAP_SUCCESS_GET,
        markers,
    };
}

export function startLoading() {
    return {
        type: START_LOAD,
    };
}

export function mapError(e) {
    return {
        type: ERROR,
        error: e,
    }
}