import React from 'react'

import './popup-window.scss';

const PopupWrapper = ({ show, children }) => {
    return (
        <div className={show ? `popup-window` : `modal-hide `}>

            <div className="popup-window__modal">
                {children}
            </div>

            <div className="popup-window__bg"></div>
        </div>
    )
}

export default PopupWrapper
