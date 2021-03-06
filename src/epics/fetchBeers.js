import {concat, forkJoin, fromEvent, merge, of, race}  from 'rxjs';
import {ofType} from 'redux-observable'
import {ignoreElements, map, tap, switchMap, debounceTime, filter, catchError, delay, takeUntil, mapTo, withLatestFrom, pluck} from 'rxjs/operators';
import { setStatus, fetchFulfilled, FETCH_DATA, SEARCH, fetchFailed, CANCEL, reset, RANDOM } from '../reducers/beersActions';
const search = (term, apiBase, perPage) => `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;
const random = (apiBase) => `${apiBase}/random`;

export function fetchBeersEpic(action$, state$,{getJSON, document}) {
    return action$.pipe(
    //   ofType(RANDOM),
      ofType(SEARCH),
      debounceTime(500),
      filter(({payload}) => payload.trim() !== ''),
      // withLatestFrom(state$), // aventando el valor del padre al hijo
      withLatestFrom(
          state$.pipe(pluck('config'))
        ), // aventando el valor del padre al hijo
      switchMap(([{ payload }, config]) => {

        // const reqs = [...Array(config.perPage)].map(()=>{
        //     return getJSON(random(config.apiBase)).pipe(pluck(0));
        // })

        const blocker$ = merge(
          action$.pipe(ofType(CANCEL)),
          fromEvent(document, "keyup").pipe(
            filter((evt) => evt.key === "Escape" || evt.key === "Esc")
          )
        ).pipe(mapTo(reset()));

        // const ajax$ = forkJoin(reqs).pipe(
        //   map((resp) => fetchFulfilled(resp)),
        //   catchError((err) => {
        //     return of(fetchFailed(err.response.message));
        //   })
        // );

           // const ajax$ = ajax.getJSON(search(payload, state.config.apiBase)).pipe(
       const ajax$ = getJSON(search(payload, config.apiBase, config.perPage)).pipe(
              // delay(1000),
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