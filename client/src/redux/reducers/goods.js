const initialState = {
    items: [],
    itemDetails: {},
    page: 1,
    totalCount: 0,
    limit: 8,
    isLoaded: false
}

const goods = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GOODS':
            return {
                ...state,
                items: action.payload,
                isLoaded: true
            };
        case 'SET_POPULAR_GOODS':
            return {
                ...state,
                popularItems: action.payload,
                isLoaded: true
            };
        case 'SET_ITEM_DETAILS':
            return {
                ...state,
                itemDetails: action.payload,
                isLoaded: true
            };
        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload
            };
        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload,
            };
        case 'SET_LIMIT':
            return {
                ...state,
                limit: action.payload,
            };
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                totalCount: action.payload,
            };
        default:
            return state;
    }
};


export default goods;