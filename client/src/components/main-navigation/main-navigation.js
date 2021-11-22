import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/consts';

import './main-navigation.scss';

const MainNavigation = ({ onClickLink }) => {

    const handleLinkClick = () => {
        onClickLink && onClickLink();
    }

    return (
        <ul className="main-navigation">
            <li>
                <Link to={Routes.HOME_ROUTE} onClick={handleLinkClick}> Головна </Link>
            </li>
            <li>
                <Link to={Routes.ABOUT_ROUTE} onClick={handleLinkClick}> Про нас </Link>
            </li>
            <li>
                <Link to={Routes.CONTACTS_ROUTE} onClick={handleLinkClick}> Контакти </Link>
            </li>
            <li>
                <Link to={Routes.SHOP_ROUTE} onClick={handleLinkClick}> Магазин </Link>
            </li>
            <li>
                <Link to={Routes.PAYMENT_DELIVERY_ROUTE} onClick={handleLinkClick}> Доставка і оплата </Link>
            </li>
        </ul>
    )
}

export default MainNavigation
