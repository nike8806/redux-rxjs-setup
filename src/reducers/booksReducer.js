import {FETCH_FULFILLED, SET_STATUS, FETCHED_FAILED, CANCEL, RESET} from './beersActions';
const initialState = {
    data:[],
    status: "idle", // idle, pending, success, failure,
    apiBooks: 'https://api.punkapi.com/v2/beers',
    perPage: 10
}
export function appReducer(state = {name: 'Shane'}, action ){
    switch(action.type) {
        case FETCH_FULFILLED: {
            return {
                ...state,
                status: 'success',
                data: action.payload,
                messages: []
            }
        }
    }
    return state;
}