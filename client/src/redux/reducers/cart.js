const initialState = {
    items: {},
    totalCount: 0,
    totalPrice: 0
}

const updateCart = (state, id) => {
    const newObj = Object.keys(state).filter(key =>
        key !== `${id}`).reduce((obj, key) => {
            obj[key] = state[key];
            return obj;
        }, {});
    return newObj;
}

const cart = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case 'ADD_ITEM_TO_CART':
            const id = payload.id;
            const item = state.items[id];

            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: !item ? [payload] : [...state.items[id], payload]
                },
                itemTotalCount: {
                    ...state.itemTotalCount,
                    [id]: item ? state.itemTotalCount[id] + 1 : 1
                },
                itemTotalPrice: {
                    ...state.itemTotalPrice,
                    [id]: item ? state.itemTotalPrice[id] + payload.price : payload.price
                },
                totalCount: state.totalCount + 1,
                totalPrice: state.totalPrice + payload.price
            };

        case 'MINUS_CART_ITEM':
            const [remove, ...newItemsList] = state.items[payload];

            return {
                ...state,
                items: {
                    ...state.items,
                    [payload]: newItemsList
                },
                itemTotalPrice: {
                    ...state.itemTotalPrice,
                    [payload]: state.itemTotalPrice[payload] - remove.price
                },
                itemTotalCount: {
                    ...state.itemTotalCount,
                    [payload]: state.itemTotalCount[payload] - 1
                },
                totalCount: state.totalCount - 1,
                totalPrice: state.totalPrice - remove.price
            };

        case 'REMOVE_CART_ITEM':
            return {
                ...state,
                items: updateCart(state.items, payload),
                itemTotalPrice: updateCart(state.itemTotalPrice, payload),
                itemTotalCount: updateCart(state.itemTotalCount, payload),
                totalCount: state.totalCount - state.itemTotalCount[payload],
                totalPrice: state.totalPrice - state.itemTotalPrice[payload],
            };

        case 'CLEAR_CART':
            return {
                items: {},
                totalCount: 0,
                totalPrice: 0
            };

        default:
            return state;
    }
};

export default cart;