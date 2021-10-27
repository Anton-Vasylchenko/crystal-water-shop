import React from 'react'
import { setIsAuth } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

import './admin-panel.scss';

function AdminPanel() {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(setIsAuth(false));
        localStorage.removeItem('token')
    }

    return (
        <div className="admin-panel text-center">
            Адміністратор | <div className="admin-btn-exit" onClick={logOut}>Вийти</div>
        </div>
    )
}

export default AdminPanel
