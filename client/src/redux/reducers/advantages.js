const initialState = {
    items: [],
    isLoaded: false
}

const advantages = (state = initialState, action) => {
    if (action.type === 'SET_ADVANTAGES') {
        return {
            ...state,
            items: action.payload,
            isLoaded: true
        };
    }
    return state;
};


export default advantages;