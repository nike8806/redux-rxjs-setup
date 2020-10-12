export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";
export const FETCHED_FAILED = "FETCHED_FAILED";
export const CANCEL = 'CANCEL';
export const RESET = 'RESET';



export function fetchFulfilled(beers) {
    return {
        type: FETCH_FULFILLED,
        payload: beers,
    }
}

export function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: status,
    }
}

export function fetchData() {
    return {
        type: FETCH_DATA,
    }
}

export function cancel() {
    return {
        type: CANCEL
    }
}

export function reset() {
    return {
        type: RESET
    }
}

export function fetchFailed(message) {
    return {
        type: FETCHED_FAILED,
        payload: message
    }
}

export function search(text) {
    return {
        type: SEARCH,
        payload: text
    }
}

