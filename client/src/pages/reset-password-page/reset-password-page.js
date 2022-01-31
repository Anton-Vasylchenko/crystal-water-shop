import React, { useState } from 'react';
import { isFiveChars } from '../../helpers/isValidInput';
import Container from '../../components/UI/container';
import { Alert } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { resetPassword } from '../../services/userAPI';

function ResetPasswordPage({ userId, token }) {
    const [error, setError] = useState('');
    const [enteredPasswordInput, setEnteredPasswordInput] = useState('');

    const history = useHistory();

    const onChangePasswordHandler = (e) => {
        setError('');
        setEnteredPasswordInput(e.target.value);
    }

    const onSubmitNewPassword = (e) => {
        e.preventDefault();

        if (!isFiveChars(enteredPasswordInput)) {
            setError('Пароль повинен бути не менше 5 символів');
            return;
        }

        resetPassword(userId, token, enteredPasswordInput).then(data => {
            console.log(data);
        })

        history.push('/login');
    }

    return <Container>
        <form className="login-form" onSubmit={onSubmitNewPassword}>

            {error.length > 0 && <Alert variant='danger'>
                {error}
            </Alert>}

            <h3> Введіть новий пароль: </h3>

            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={enteredPasswordInput}
                    onChange={onChangePasswordHandler}
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Змінити пароль</button>
        </form>
    </Container >;
}

export default ResetPasswordPage;
