import { combineReducers } from 'redux';
import { drizzleReducers } from 'drizzle';
import kitties, { _getKitty, _getKittyLoading, _getKittyImageUrl, _getKittyLoadError } from './kittiesReducer';

const rootReducer = combineReducers({
    ...drizzleReducers,
    kitties
});

export const getKitties = state => state.kitties;
export const getKitty = (state, id) => _getKitty(getKitties(state), id);
export const getKittyLoading = (state, id) => _getKittyLoading(getKitty(state, id));
export const getKittyImageUrl = (state, id) => _getKittyImageUrl(getKitty(state, id));
export const getKittyLoadError = (state, id) => _getKittyLoadError(getKitty(state, id));

export default rootReducer;
