import React from 'react';
import { Link } from 'react-router-dom';
import { AdminProductDelete } from '../admin/admin-products';
import { UserRoles } from '../../utils/consts';

import './shop-item.scss';

function ShopItem({ id, name, img, price, onClickBuyBtn, countOfAdded, isAdmin, isModerator }) {

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
        <div className="shop-item">
            {isAdmin || isModerator ? <AdminProductDelete name={name} id={id} /> : ''}
            <div className="shop-item__img">
                <img src={`${process.env.REACT_APP_API_URL}products/${img}`} alt="poster" />
            </div>
            <div className="shop-item__title">
                <Link to={`/shop/${id}`}>{name}</Link>
            </div>

            <div className="shop-item__bottom">
                <div className="row">
                    <div className="col-12 col-lg-6 shop-item__price">
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

export default ShopItem
