import {ajax} from 'rxjs/ajax';
import {concat, fromEvent, merge, of, race}  from 'rxjs';
import {ofType} from 'redux-observable'
import {ignoreElements, map, tap, switchMap, debounceTime, filter, catchError, delay, takeUntil, mapTo, withLatestFrom, pluck} from 'rxjs/operators';
import { setStatus, fetchFulfilled, FETCH_DATA, SEARCH, fetchFailed, CANCEL, reset } from '../reducers/beersActions';
const search = (term, apiBase) => `${apiBase}?beer_name=${encodeURIComponent(term)}`;

export function fetchBeersEpic(action$, state$) {
    return action$.pipe(
      ofType(SEARCH),
      debounceTime(500),
      filter(({payload}) => payload.trim() !== ''),
      //   withLatestFrom(state$), // aventando el valor del padre al hijo
      withLatestFrom(
          state$.pipe(pluck('config', 'apiBase')),
          state$.pipe(pluck('user', 'authToken'))
        ), // aventando el valor del padre al hijo
      switchMap(([{ payload }, apiBase, authToken]) => {

        const blocker$ = merge(
          action$.pipe(ofType(CANCEL)),
          fromEvent(document, "keyup").pipe(
            filter((evt) => evt.key === "Escape" || evt.key === "Esc")
          )
        ).pipe(mapTo(reset()));
        // const ajax$ = ajax.getJSON(search(payload, state.config.apiBase)).pipe(
        const ajax$ = ajax.getJSON(search(payload, apiBase)).pipe(
          delay(5000),
          // takeUntil(action$.pipe(ofType(CANCEL))),
          map((resp) => fetchFulfilled(resp)),
          catchError((err) => {
            return of(fetchFailed(err.response.message));
          })
        );

        return concat(
            of(setStatus("pending")),
            race(ajax$, blocker$)
        );
      })
    );

    // return action$.pipe(
    //     ofType(FETCH_DATA),
    //     switchMap(() => {
    //         return concat(
    //             of(setStatus('pending')),
    //             ajax.getJSON(API).pipe(
    //                 map(resp => fetchFulfilled(resp))
    //             )
    //         )
    //     })
    // )
    
}