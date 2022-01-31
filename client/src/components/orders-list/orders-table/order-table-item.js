import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductDefault } from '../../../utils/consts';

function OrderTableItem({ item }) {
    const [isProductDeleted, setIsProductDeleted] = useState(false);

    const onErrorImage = (e) => {
        setIsProductDeleted(true);
        e.target.onError = null;
        e.target.src = `${process.env.REACT_APP_API_URL}/products/${ProductDefault.IMAGE}`;
    }

    return <tr key={item.id}>
        <td className="order-table-img">
            <img src={`${process.env.REACT_APP_API_URL}products/${item.img}`} onError={onErrorImage} alt="poster" />
        </td>
        <td>
            {isProductDeleted ? <p>{item.name}</p> : <Link to={`/shop/${item.goodsId}`}>{item.name}</Link>}
        </td>
        <td>{item.count}</td>
        <td>{item.price * item.count} ₴</td>
    </tr>;
}

export default OrderTableItem;
