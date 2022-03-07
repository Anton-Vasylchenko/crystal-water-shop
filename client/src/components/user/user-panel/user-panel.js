import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUserLogout } from '../../../redux/actions';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { transformedUserName } from '../../../helpers/transformedUserName';

import './user-panel.scss';
import { Routes, UserDefault, UserRoles, ImgUrlDefault } from '../../../utils/consts';
import { useHistory } from "react-router-dom";

function UserPanel() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { name, image, role, isAuth } = useSelector(({ user }) => user);

    const userName = transformedUserName(name);

    const logOut = () => {
        dispatch(setUserLogout());
        const pathname = history.location.pathname;

        if (pathname === Routes.ORDERS_LIST ||
            pathname === Routes.USER_PROFILE ||
            pathname === Routes.USERS_LIST) {
            history.push('/')
        }

        localStorage.removeItem('token');
    }

    const isAdmin = role === UserRoles.ADMIN && isAuth;

    const imageUrl = !image ? UserDefault.IMAGE : image;

    return (
        <div className="user-panel">
            <div className="user-img">
                <img src={`${ImgUrlDefault.USERS}${imageUrl}`} alt="user-avatar" />
            </div>

            <DropdownButton id="dropdown-basic-button" title={userName}>

                <Dropdown.Item as={Link} eventKey={"1"} to={Routes.USER_PROFILE}>
                    Профіль
                </Dropdown.Item>

                {isAdmin
                    && <Dropdown.Item as={Link} eventKey={"4"} to={Routes.USERS_LIST}>
                        Список користувачів
                    </Dropdown.Item>}

                <Dropdown.Item as={Link} eventKey={"2"} to={Routes.ORDERS_LIST}>
                    Список замовлень
                </Dropdown.Item>

                <Dropdown.Item onClick={logOut} eventKey={"3"}>
                    Вихід
                </Dropdown.Item>

            </DropdownButton>
        </div>
    )
}

export default UserPanel
