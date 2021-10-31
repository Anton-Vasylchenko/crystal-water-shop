import React from 'react';
import { Container } from '../../components';
import { setIsAuth } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { login, registration } from '../../services/userAPI';
import { useHistory } from 'react-router-dom';

import './login-page.scss';

function LoginPage() {
    const dispatch = useDispatch();
    const { isAuth } = useSelector(({ user }) => user);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    const signIn = async (event) => {
        event.preventDefault();

        try {
            const response = await login(email, password);
            dispatch(setIsAuth(true))
            history.push('/')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    if (isAuth) {
        return <div>Ви вже залогінені!</div>
    }

    return (
        <Container>
            <form className="login-form" onSubmit={signIn}>
                <h2>Login</h2>

                <div className="form-outline mb-4">
                    <input
                        type="email"
                        id="form1Example1"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form1Example1">Email</label>
                </div>

                <div className="form-outline mb-4">
                    <input
                        type="password"
                        id="form1Example2"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form1Example2" >Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
            </form>
        </Container>
    )
}

export default LoginPage
