import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/consts';

import './login-panel.css';

function LoginPanel() {
    return (
        <ul className="login-panel">
            <li><Link to={Routes.LOGIN_ROUTE}> Login </Link></li>
            <li><Link to={Routes.REGISTRATION_ROUTE}> Registration </Link></li>
        </ul>
    )
}

export default LoginPanel
