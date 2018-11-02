import { createAction } from 'redux-actions';
import * as ActionConstants from './actionConstants';
import { getKitty } from '../reducers/index';
import { fetchKitty } from '../api/kittiesApi';

export const kittyLoaded = createAction(ActionConstants.KITTY_LOADED);
export const kittyLoading = createAction(ActionConstants.KITTY_LOADING);

export const getKittyData = id => {
    return async (dispatch, getState) => {
        try {
            if (getKitty(getState(), id)) {
                return;
            }

            dispatch(kittyLoading(id));

            const kitty = await fetchKitty(id);

            dispatch(kittyLoaded(kitty));
            return kitty;

        } catch (e) {
            // TODO: handle error
        }
    };
};
