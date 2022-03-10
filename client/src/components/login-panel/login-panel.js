import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../utils/consts';

import './login-panel.scss';

function LoginPanel() {

    return (
        <ul className="login-panel">
            <li>
                <NavLink
                    activeClassName="login-panel__active"
                    to={Routes.LOGIN_ROUTE}> Увійти </NavLink>
            </li>
            <li>
                <NavLink
                    activeClassName="login-panel__active"
                    to={Routes.REGISTRATION_ROUTE}> Реєстрація </NavLink>
            </li>
        </ul>
    )
}

export default LoginPanel
