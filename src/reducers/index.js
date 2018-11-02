import { combineReducers } from 'redux';
import { drizzleReducers } from 'drizzle';
import kittiesReducer, { _getKitty, _getKittyLoading, _getKittyImageUrl } from './kittiesReducer';

const rootReducer = combineReducers({
    ...drizzleReducers,
    kittiesReducer
});

export const getKitties = state => state.kitties;
export const getKitty = (state, id) => _getKitty(getKitties(state), id);
export const getKittyLoading = (state, id) => _getKittyLoading(getKitty(state, id));
export const getKittyImageUrl = (state, id) => _getKittyImageUrl(getKitty(state, id));

export default rootReducer;
