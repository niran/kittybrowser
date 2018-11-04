import { handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';
import * as ActionConstants from '../actions/actionConstants';

export class KittyRecord extends Record({
    id: -1,
    imageUrl: '',
    loading: false,
    error: null
}) {}

export const _getKittyImageUrl = kittyRecord => kittyRecord.imageUrl;
export const _getKittyLoading = kittyRecord => kittyRecord.loading;
export const _getKittyLoadError = kittyRecord => kittyRecord.error;

export const _getKitty = (kittiesMap, id) => kittiesMap.get(id);

let reducers = {};

reducers[ActionConstants.KITTY_LOADING] = (state, { payload }) => {
    if (state.has(payload)) {
        return state;
    }
    return state.set(payload, new KittyRecord({
        id: payload,
        loading: true
    }));
};

reducers[ActionConstants.KITTY_LOADED] = (state, { payload }) => {
    return state
        .setIn([payload.id, 'loading'], false)
        .setIn([payload.id, 'imageUrl'], payload.image_url);
};

reducers[ActionConstants.KITTY_LOAD_ERROR] = (state, { payload }) => {
    return state
        .setIn([payload.id, 'error'], payload.error)
        .setIn([payload.id, 'loading'], false);
};

export default handleActions(reducers, new Map());
