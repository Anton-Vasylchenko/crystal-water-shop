import React from 'react';

import MainLogo from '../main-logo';
import MainNavigation from '../main-navigation';
import { useSelector } from 'react-redux';

import LoginPanel from '../login-panel';

import './mobile-menu.scss';

function MobileMenu() {
    const [showMenu, setShowMenu] = React.useState(false);
    const { isAuth } = useSelector(({ user }) => user);

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    }

    return (
        <div className="mobile-menu-wrapper">
            <div className="mobile-btn-menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div onClick={toggleMenu} className={!showMenu ? "mobile-menu" : "mobile-menu show-menu"}>
                <MainLogo />
                <MainNavigation />
                {!isAuth && <LoginPanel />}
            </div>

            <div
                className={showMenu ? "bg-mobile-menu" : "bg-mobile-menu d-none"}
                onClick={toggleMenu}>
            </div>
        </div>
    )
}

export default MobileMenu;
