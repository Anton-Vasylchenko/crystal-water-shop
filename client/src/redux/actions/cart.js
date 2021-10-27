const addItemToCart = (obj) => ({
    type: 'ADD_ITEM_TO_CART',
    payload: obj
});

const clearCart = () => ({
    type: 'CLEAR_CART'
});

const removeCartItem = (id) => ({
    type: 'REMOVE_CART_ITEM',
    payload: id
});

const plusCartItem = (id) => ({
    type: 'PLUS_CART_ITEM',
    payload: id
});

const minusCartItem = (id) => ({
    type: 'MINUS_CART_ITEM',
    payload: id
});

export { addItemToCart, clearCart, removeCartItem, minusCartItem, plusCartItem };