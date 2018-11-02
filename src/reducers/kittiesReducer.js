import { handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';
import * as ActionConstants from '../actions/actionConstants';

export class KittyRecord extends Record({
    id: -1,
    imageUrl: '',
    loading: false
}) {}

export const _getKittyImageUrl = kittyRecord => kittyRecord.imageUrl;
export const _getKittyLoading = kittyRecord => kittyRecord.loading;

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

export default handleActions(reducers, new Map());
