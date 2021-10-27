const initialState = {
    role: 'ADMIN',
    isAuth: false,
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_AUTH':
            return {
                ...state,
                isAuth: action.payload,
            };
        case 'SET_USER':
            return {
                ...state,
                role: action.payload,
            };
        default:
            return state;
    }
};


export default user;