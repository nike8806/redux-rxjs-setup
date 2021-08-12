export const FETCH_DATA = "FETCH_DATA";
export const SET_STATUS = "SET_STATUS";

export function fetchData() {
    return {
        type: FETCH_DATA
    }
}

export function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: status,
    }
}
