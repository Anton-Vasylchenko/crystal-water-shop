import React from 'react';
import { Link } from 'react-router-dom';
import { AdminProductDelete } from '../../admin/admin-products';
import useIsAdmin from '../../../hooks/useIsAdmin';
import useIsModerator from '../../../hooks/useIsModerator';

import './list-item.scss';

function ListItem({ id, name, img, price, onClickBuyBtn, countOfAdded }) {
    const isAdmin = useIsAdmin();
    const isModerator = useIsModerator();

    const onAddItem = () => {
        const obj = {
            id,
            name,
            img,
            price
        };

        onClickBuyBtn(obj);
    }

    return (
        <div className="list-item">
            {isAdmin || isModerator ? <AdminProductDelete name={name} id={id} /> : ''}
            <div className="shop-item__img">
                <img src={`${process.env.REACT_APP_API_URL}products/${img}`} alt="poster" />
            </div>
            <div className="list-item__title">
                <Link to={`/shop/${id}`}>{name}</Link>
            </div>

            <div className="list-item__bottom">
                <div className="row">
                    <div className="col-12 col-lg-6 list-item__price">
                        {price} ₴
                    </div>
                    <div className="col-12 col-lg-6 text-center">
                        <button onClick={onAddItem} className="btn-add-to-cart">
                            +Додати {countOfAdded && <span>{countOfAdded}</span>}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ListItem
