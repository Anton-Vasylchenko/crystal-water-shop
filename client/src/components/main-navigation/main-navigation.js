import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../utils/consts';

import './main-navigation.scss';

const MainNavigation = () => {
    return (
        <ul className="main-navigation">
            <li>
                <NavLink
                    activeClassName="main-navigation__active"
                    exact={true} to={Routes.HOME_ROUTE}> Головна </NavLink>
            </li>
            <li>
                <NavLink
                    activeClassName="main-navigation__active"
                    to={Routes.ABOUT_ROUTE}> Про нас </NavLink>
            </li>
            <li>
                <NavLink
                    activeClassName="main-navigation__active"
                    to={Routes.CONTACTS_ROUTE}> Контакти </NavLink>
            </li>
            <li>
                <NavLink
                    activeClassName="main-navigation__active"
                    to={Routes.SHOP_ROUTE}> Магазин </NavLink>
            </li>
            <li>
                <NavLink
                    activeClassName="main-navigation__active"
                    to={Routes.PAYMENT_DELIVERY_ROUTE}> Доставка і оплата </NavLink>
            </li>
        </ul>
    )
}

export default MainNavigation
