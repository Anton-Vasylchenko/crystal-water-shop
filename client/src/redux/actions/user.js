const setIsAuth = (bool) => ({
    type: 'SET_IS_AUTH',
    payload: bool
});

const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
});

const setRole = (role) => ({
    type: 'SET_ROLE',
    payload: role
});

export { setIsAuth, setUser, setRole };