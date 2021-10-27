import apiServices from '../../services/api-services';

const fetchCategories = () => (dispatch) => {
    apiServices.getShopCategories().then(data => {
        dispatch(setCategories(data));
    })
}

const setCategories = (items) => ({
    type: 'SET_CATEGORIES',
    payload: items
});

const setActiveCategory = (index) => ({
    type: 'SET_ACTIVE_CATEGORY',
    payload: index
});

const setSortBy = (name) => ({
    type: 'SET_SORT_BY',
    payload: name
});

const setSortOrder = (name) => ({
    type: 'SET_SORT_ORDER',
    payload: name
});


export {
    setSortBy,
    setCategories,
    setActiveCategory,
    fetchCategories,
    setSortOrder
};

