const initialState = {
    role: 'USER',
    isAuth: false,
    email: '',
    name: '',
    id: '',
    phone: ''
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
                ...action.payload
            };
        case 'SET_ROLE':
            return {
                ...state,
                role: action.payload
            };
        case 'SET_USER_LOGOUT':
            return {
                role: 'USER',
                isAuth: false,
                email: '',
                name: '',
                id: '',
                phone: ''
            };
        default:
            return state;
    }
};


export default user;