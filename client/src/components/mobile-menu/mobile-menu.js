import React from 'react';

import MainLogo from '../main-logo';
import MainNavigation from '../main-navigation';

import './mobile-menu.scss';

function MobileMenu() {
    const [showMenu, setShowMenu] = React.useState(false);

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

            <div className={!showMenu ? "mobile-menu" : "mobile-menu show-menu"}>
                <MainLogo />
                <MainNavigation onClickLink={toggleMenu} />
            </div>

            <div
                className={showMenu ? "bg-mobile-menu" : "bg-mobile-menu d-none"}
                onClick={toggleMenu}>
            </div>
        </div>
    )
}

export default MobileMenu;
