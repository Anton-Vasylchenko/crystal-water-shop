const initialState = {
    activeCategory: null,
    sortBy: 'rating',
    sortOrder: 'asc'
}

const filters = (state = initialState, action) => {
    if (action.type === 'SET_SORT_BY') {
        return {
            ...state,
            sortBy: action.payload
        }
    }

    if (action.type === 'SET_SORT_ORDER') {
        return {
            ...state,
            sortOrder: action.payload,
        }
    }

    if (action.type === 'SET_CATEGORIES') {
        return {
            ...state,
            categories: action.payload
        }
    }

    if (action.type === 'SET_ACTIVE_CATEGORY') {
        return {
            ...state,
            activeCategory: action.payload
        }
    }

    return state;
};


export default filters;