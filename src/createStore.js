import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';
import rootSaga from './sagas/index';
import { generateContractsInitialState } from 'drizzle';
import drizzleOptions from './drizzleConfig';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
    contracts: generateContractsInitialState(drizzleOptions)
};

export default createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware, thunk)
    )
);

sagaMiddleware.run(rootSaga);
