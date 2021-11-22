import React from 'react'
import PropTypes from 'prop-types';
import Spinner from '../spinner';
import BackArrow from '../back-arrow';

import './container.scss';

function Container({ title, children, backArrow, isLoaded = true }) {

    const mainTitle = title ? <h4>{title}</h4> : null;
    const backArrowBtn = backArrow ? <BackArrow /> : '';
    const loading = isLoaded ? children : <Spinner />

    return (
        <div className="container">
            <div className="main-wrapper">
                <div className="container-title">
                    {backArrowBtn}
                    {mainTitle}
                </div>
                <div className="content">
                    {loading}
                </div>
            </div>
        </div>
    )
}

Container.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    backArrow: PropTypes.bool,
    isLoaded: PropTypes.bool
};

export default Container
