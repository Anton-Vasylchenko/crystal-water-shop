const initialState = {
    items: [],
    itemDetails: {},
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
        default:
            return state;
    }
};


export default goods;