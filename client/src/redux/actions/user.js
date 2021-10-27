const setIsAuth = (bool) => ({
    type: 'SET_IS_AUTH',
    payload: bool
});

const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
});

export { setIsAuth, setUser };