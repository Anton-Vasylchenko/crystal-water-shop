import React from 'react';
import parse from 'html-react-parser';
import { AdminComponentsEdit } from '../../../admin/admin-components';

function FooterItem({ item, updateFooterInfo, isAdmin }) {
    return (
        <div key={item.id} className="col-12 col-md-3 d-flex align-items-center footer-block">
            <div className="footer__icon">
                {item.img && <img src={`${process.env.REACT_APP_API_URL}components/${item.img}`} className="img-fluid" alt="main logo" />}
            </div>

            <div className="footer__text">
                {parse(`${item.text}`)}
            </div>
            {isAdmin ? <div className="footer-editBtn">
                <AdminComponentsEdit data={item} updateData={updateFooterInfo} />
            </div> : ''}
        </div>
    )
}

export default FooterItem
