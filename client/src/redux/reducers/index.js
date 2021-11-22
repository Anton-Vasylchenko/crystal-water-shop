import { combineReducers } from 'redux';

import goods from './goods';
import filters from './filters';
import advantages from './advantages';
import cart from './cart';
import user from './user';
import orders from './orders';

const rootReducer = combineReducers({
    goods,
    filters,
    advantages,
    cart,
    user,
    orders
});

export default rootReducer;