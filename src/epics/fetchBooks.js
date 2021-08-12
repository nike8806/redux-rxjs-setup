import {FETCH_DATA, SET_STATUS} from './booksActions';

const initialState = {
    data:[],
    status: "idle" // idle, pending, success, failure
}

export function booksReducers(state = initialState, action) {
    switch(action.type) {
        case FETCH_DATA: {
            return {
                ...state,
                status: 'success',
                data: action.payload
            }
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.payload
            }
        }

        default: return state;

    }
}
