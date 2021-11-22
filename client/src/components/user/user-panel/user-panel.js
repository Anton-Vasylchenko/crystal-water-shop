import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuth } from '../../../redux/actions';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './user-panel.scss';
import { Routes, UserDefault, UserRoles } from '../../../utils/consts';

function UserPanel() {
    const dispatch = useDispatch();

    const { name, image, id, role, isAuth } = useSelector(({ user }) => user);

    const logOut = () => {
        dispatch(setIsAuth(false));
        localStorage.removeItem('token');
    }

    const isAdmin = role === UserRoles.ADMIN && isAuth;

    const imageUrl = !image ? UserDefault.IMAGE : image;

    return (
        <div className="user-panel">
            <div className="user-img">
                <img src={`${process.env.REACT_APP_API_URL}users/${imageUrl}`} alt="user-avatar" />
            </div>

            <DropdownButton id="dropdown-basic-button" title={name}>

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
