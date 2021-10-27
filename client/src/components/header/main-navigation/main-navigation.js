import React from 'react';
import { Link } from 'react-router-dom';

import './main-navigation.scss';

const MainNavigation = ({ onClickLink }) => {

    const handleLinkClick = () => {
        onClickLink && onClickLink();
    }

    return (
        <ul>
            <li>
                <Link to="/" onClick={handleLinkClick}> Головна </Link>
            </li>
            <li>
                <Link to="/about-us" onClick={handleLinkClick}> Про нас </Link>
            </li>
            <li>
                <Link to="/contacts" onClick={handleLinkClick}> Контакти </Link>
            </li>
            <li>
                <Link to="/shop" onClick={handleLinkClick}> Магазин </Link>
            </li>
            <li>
                <Link to="/payment-delivery" onClick={handleLinkClick}> Доставка і оплата </Link>
            </li>
        </ul>
    )
}

export default MainNavigation
