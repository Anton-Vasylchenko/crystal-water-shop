import apiServices from '../../services/api-services';

const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
})

const fetchGoods = (sortBy, category, sortOrder, page, limit) => (dispatch) => {
    dispatch(setLoaded(false));
    apiServices.getGoods(sortBy, category, sortOrder, page, limit).then(data => {
        dispatch(setGoods(data.rows));
        dispatch(setTotalCount(data.count));
    })
}

const fetchPopularGoods = (catId) => (dispatch) => {

    const page = 1;
    const limit = 4;
    const sortOrder = 'desc';
    const sortBy = 'rating'

    dispatch(setLoaded(false));
    apiServices.getGoods(sortBy, catId, sortOrder, page, limit).then(data => {
        dispatch(setPopularGoods(data.rows));
    })
}

const fetchItemDetails = (id) => (dispatch) => {
    dispatch(setLoaded(false));
    apiServices.getShopItemById(id).then(data => {
        console.log(data)
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

const setPage = (pageNumber) => ({
    type: 'SET_PAGE',
    payload: pageNumber
});

const setLimit = (limitGoods) => ({
    type: 'SET_LIMIT',
    payload: limitGoods
});

const setTotalCount = (totalCount) => ({
    type: 'SET_TOTAL_COUNT',
    payload: totalCount
});

export {
    setGoods,
    fetchGoods,
    setLoaded,
    fetchPopularGoods,
    fetchItemDetails,
    setPage,
    setTotalCount,
    setLimit
};