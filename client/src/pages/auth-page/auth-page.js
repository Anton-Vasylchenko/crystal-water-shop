import React from 'react';
import Container from '../../components/UI/container';
import { setIsAuth, setUser } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { login, registration } from '../../services/userAPI';
import { useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../utils/consts';
import { Alert } from 'react-bootstrap';

import './auth-page.scss';

function LoginPage() {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(({ user }) => user);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [error, setError] = React.useState('');
    const history = useHistory();
    const location = useLocation();

    const isLogin = location.pathname === Routes.LOGIN_ROUTE;

    React.useEffect(() => {
        setError('')
    }, [location])

    const auth = async (event) => {
        event.preventDefault();

        if (!email.includes('@') || email.trim().length === 0) {
            setError('Email is not correct');
            return
        }

        if (!isLogin && userName.trim().length === 0) {
            setError('Name is not correct');
            return;
        }

        if (password.trim().length === 0) {
            setError('Password is not correct');
            return;
        }

        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                console.log(data);
            } else {
                data = await registration(email, password, userName);

            }
            dispatch(setIsAuth(true))
            dispatch(setUser(data))
            history.push('/')
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    if (isAuth) {
        return (
            <Container>
                <div className="text-center">Ви вже залогінені!</div>
            </Container>
        )
    }

    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const onChangeNameHandler = (e) => {
        setUserName(e.target.value)
    }

    return (
        <Container>
            <form className="login-form" onSubmit={auth}>

                {error.length > 0 && <Alert variant='danger'>
                    {error}
                </Alert>}

                <h2> {isLogin ? 'Login' : 'Registration'} </h2>

                <div className="form-outline mb-4">
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={onChangeEmailHandler}
                    />
                    <label className="form-label" htmlFor="email">Email</label>
                </div>

                {!isLogin && <div className="form-outline mb-4">
                    <input
                        type="text"
                        id="userName"
                        className="form-control"
                        value={userName}
                        onChange={onChangeNameHandler}
                    />
                    <label className="form-label" htmlFor="userName">Name</label>
                </div>}

                <div className="form-outline mb-4">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={onChangePasswordHandler}
                    />
                    <label className="form-label" htmlFor="password" >Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block">{isLogin ? 'Login' : 'Registration'}</button>
            </form>
        </Container >
    )
}

export default LoginPage
