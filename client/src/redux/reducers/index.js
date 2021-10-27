import { combineReducers } from 'redux';

import goods from './goods';
import filters from './filters';
import advantages from './advantages';
import cart from './cart';
import user from './user';

const rootReducer = combineReducers({
    goods,
    filters,
    advantages,
    cart,
    user
});

export default rootReducer;