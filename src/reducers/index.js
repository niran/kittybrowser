import { combineReducers } from 'redux';
import { drizzleReducers } from 'drizzle';

const rootReducer = combineReducers({
    ...drizzleReducers
});

export default rootReducer;
