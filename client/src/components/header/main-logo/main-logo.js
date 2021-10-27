import React from 'react'
import { Link } from 'react-router-dom';

import Logo from '../../../assets/images/logo.png';
import './main-logo.scss';

function MainLogo({ classNames }) {

    const className = !classNames ? `logo-wrapper` : `${classNames} logo-wrapper`;

    return (
        <div className={className}>
            <Link to="/">
                <div className="main__logo">
                    <img src={Logo} alt="logo" />
                </div>
            </Link>
        </div>
    )
}

export default MainLogo
