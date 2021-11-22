import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainNavigation from '../../main-navigation';
import MainLogo from '../../main-logo';
import MobileMenu from '../../mobile-menu';
import { UserRoles } from '../../../utils/consts';
import UserPanel from '../../user/user-panel'

import Cart from '../../../assets/images/cart.png';

import './header.scss';
import LoginPanel from '../../login-panel';

const Header = () => {
    const { totalPrice, totalCount } = useSelector(({ cart }) => cart);
    const { isAuth, role } = useSelector(({ user }) => user);

    return (
        <div className="header align-items-center">

            <div className="container">
                <div className="row">
                    <div className="col-1 col-md-5 col-lg-1">
                        <MobileMenu />
                        <MainLogo />
                    </div>

                    <div className="col-md-7 col-lg-6 align-items-center main-menu">
                        <MainNavigation />
                    </div>

                    <div className="col-11 col-md-7 col-lg-5 d-flex justify-content-end align-items-center">

                        {!isAuth ? <LoginPanel /> : <UserPanel />}

                        <Link to="/cart">
                            <div className="button--cart d-flex mr-a">
                                <span>{totalPrice} ₴</span>
                                <div className="button--cart__delimiter"></div>
                                <img className="button--cart__img" src={Cart} alt="cart-img" />
                                <span>{totalCount}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

