import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainNavigation from '../../main-navigation';
import MainLogo from '../../main-logo';
import MobileMenu from '../../mobile-menu';
import UserPanel from '../../user/user-panel'

import Cart from '../../../assets/images/cart.png';

import './header.scss';
import LoginPanel from '../../login-panel';

const Header = () => {
    const [btnIsHighLighted, setBtnIsHighLighted] = React.useState(false);

    const { totalPrice, totalCount } = useSelector(({ cart }) => cart);
    const { isAuth } = useSelector(({ user }) => user);

    const btnCartClasses = `button--cart d-flex mr-a ${btnIsHighLighted ? 'bump' : ''}`

    React.useEffect(() => {
        if (totalCount === 0) {
            return;
        }
        setBtnIsHighLighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighLighted(false);
        }, 300)

        return (() => {
            clearTimeout(timer);
        })
    }, [totalCount])

    return (
        <div className="header align-items-center">

            <div className="container">
                <div className="row">
                    <div className="col-1 col-md-5 col-lg-1">
                        <MobileMenu />
                        <MainLogo classNames={'header-logo'} />
                    </div>

                    <div className="col-md-7 col-lg-6 align-items-center main-menu">
                        <MainNavigation />
                    </div>

                    <div className="col-11 col-md-7 col-lg-5 d-flex justify-content-end align-items-center">

                        {!isAuth ?
                            <div className="login-panel-wrapper"><LoginPanel /></div> : <UserPanel />}

                        <Link to="/cart">
                            <div className={btnCartClasses}>
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

