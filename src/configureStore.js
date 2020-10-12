import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {appReducer} from './reducers/appReducer';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

import {ajax} from 'rxjs/ajax';
import {fetchBeersEpic}  from './epics/fetchBeers';
import { beersReducers } from './reducers/beersReducer';
import { configReducer } from './reducers/configReducer';

export function configureStore(dependencies = {}) {
    const rootEpic = combineEpics(fetchBeersEpic);
    const epicMiddleware = createEpicMiddleware({
        dependencies: {
            getJSON: ajax.getJSON,
            document: document,
            ...dependencies
        }
    });

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