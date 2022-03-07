import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/consts';

import './main-navigation.scss';

const MainNavigation = () => {
    return (
        <ul className="main-navigation">
            <li>
                <Link to={Routes.HOME_ROUTE}> Головна </Link>
            </li>
            <li>
                <Link to={Routes.ABOUT_ROUTE}> Про нас </Link>
            </li>
            <li>
                <Link to={Routes.CONTACTS_ROUTE}> Контакти </Link>
            </li>
            <li>
                <Link to={Routes.SHOP_ROUTE}> Магазин </Link>
            </li>
            <li>
                <Link to={Routes.PAYMENT_DELIVERY_ROUTE}> Доставка і оплата </Link>
            </li>
        </ul>
    )
}

export default MainNavigation
