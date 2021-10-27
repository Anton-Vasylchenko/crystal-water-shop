import apiServices from '../../services/api-services';

const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
})

const fetchGoods = (sortBy, category, sortOrder) => (dispatch) => {
    dispatch(setLoaded(false));
    apiServices.getGoods(sortBy, category, sortOrder).then(data => {
        dispatch(setGoods(data));
    })
}

const fetchPopularGoods = (catId) => (dispatch) => {
    dispatch(setLoaded(false));
    apiServices.getGoods('rating', catId, 'desc', 4).then(data => {
        dispatch(setPopularGoods(data));
    })
}

const fetchItemDetails = (id) => (dispatch) => {
    dispatch(setLoaded(false));
    apiServices.getShopItemById(id).then(data => {
        dispatch(setItemDetails(data));
    })
}

const setGoods = (items) => ({
    type: 'SET_GOODS',
    payload: items
});

const setPopularGoods = (items) => ({
    type: 'SET_POPULAR_GOODS',
    payload: items
});

const setItemDetails = (itemDetails) => ({
    type: 'SET_ITEM_DETAILS',
    payload: itemDetails
});

export {
    setGoods,
    fetchGoods,
    setLoaded,
    fetchPopularGoods,
    fetchItemDetails
};