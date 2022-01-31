import apiServices from '../../services/api-services';

const setOrdersLoaded = (payload) => ({
    type: 'SET_ORDERS_LOADED',
    payload,
})

const setOrdersItemsLoaded = (payload) => ({
    type: 'SET_ORDERS_ITEMS_LOADED',
    payload,
})

const fetchOrders = (page, limit, userId) => (dispatch) => {
    dispatch(setOrdersLoaded(false));

    apiServices.getOrders(page, limit, userId).then(data => {
        dispatch(setOrders(data.rows));
        dispatch(setOrdersTotalCount(data.count));
    })
}
const fetchOrdersItems = (orderId) => (dispatch) => {
    dispatch(setOrdersItemsLoaded(false));

    apiServices.getOrdersItems(orderId).then(data => {
        dispatch(setOrdersItems(data.rows));
    })
}

const setOrders = (items) => ({
    type: 'SET_ORDERS',
    payload: items
});

const setOrdersItems = (items) => ({
    type: 'SET_ORDERS_ITEMS',
    payload: items
});

const setOrdersPage = (pageNumber) => ({
    type: 'SET_ORDERS_PAGE',
    payload: pageNumber
});

const setOrdersLimit = (limitGoods) => ({
    type: 'SET_LIMIT',
    payload: limitGoods
});

const setOrdersTotalCount = (totalCount) => ({
    type: 'SET_TOTAL_COUNT',
    payload: totalCount
});

export {
    setOrders,
    fetchOrders,
    setOrdersLoaded,
    setOrdersPage,
    setOrdersTotalCount,
    setOrdersLimit,
    fetchOrdersItems
};