import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {appReducer} from './reducers/appReducer';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {fetchBeersEpic}  from './epics/fetchBeers';
import { beersReducers } from './reducers/beersReducer';
import { configReducer } from './reducers/configReducer';

export function configureStore() {
    const rootEpic = combineEpics(fetchBeersEpic);
    const epicMiddleware = createEpicMiddleware();

    const rootReducer=combineReducers({
        app: appReducer,
        beers: beersReducers,
        config: configReducer
    });

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(epicMiddleware))
    );
    epicMiddleware.run(rootEpic);
    return store
}