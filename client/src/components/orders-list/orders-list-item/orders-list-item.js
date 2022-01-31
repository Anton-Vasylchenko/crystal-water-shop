import React from 'react'
import DropdownArrow from '../../UI/dropdown-arrow'
import { useDispatch } from 'react-redux';
import { fetchOrdersItems } from '../../../redux/actions/orders';
import { ProductDefault } from '../../../utils/consts';
import AdminOrderDelete from '../../admin/admin-order-delete/admin-order-delete';
import useIsAdmin from '../../../hooks/useIsAdmin';

import './orders-list-item.scss';
import OrdersTable from '../orders-table';

function OrdersListItem(props) {
    const dispatch = useDispatch();
    const isAdmin = useIsAdmin();

    const [dropdownOrder, setDropdownOrder] = React.useState(false);

    React.useEffect(() => {
        dispatch(fetchOrdersItems(props.orderNumber));
    }, []);

    const showOrderDetailsHandler = () => {
        setDropdownOrder(prevState => !prevState);
    }

    const onErrorImage = (e) => {
        e.target.onError = null;
        e.target.src = `${process.env.REACT_APP_API_URL}/products/${ProductDefault.IMAGE}`;
    }

    const orderImages = props.goods.map(item => item.img);

    const images = orderImages.slice(0, 3).map((img, index) => {
        return <img key={index + img} src={`${process.env.REACT_APP_API_URL}products/${img}`} onError={onErrorImage} alt="poster" />
    });

    const orderData = props.date.split('T')[0].split('-').join('/');

    return (
        <>
            <li className="orders-item-list">

                <div className="order-item" onClick={showOrderDetailsHandler}>
                    <div className="order-item__section order-item__number">
                        <span>№</span> {props.orderNumber}
                    </div>
                    <div className="order-item__section order-item__date">
                        <span>Дата:</span> {orderData}
                    </div>
                    <div className="order-item__section order-item__amount">
                        <span>Загальна сума:</span> {props.totalAmount} ₴
                    </div>
                    <div className="order-item__section order-item__images">
                        {images}
                        {orderImages.length > 3 ? `+${orderImages.length - 3}` : ''}
                    </div>

                    <div className="drop-arrow">
                        <DropdownArrow rotate={dropdownOrder} />
                    </div>
                </div>

                {dropdownOrder &&
                    <>
                        <OrdersTable items={props.goods} />

                        <div className="user-order-info">
                            <p><span>Ім'я:</span> {props.userName}</p>
                            <p><span>Пошта:</span> {props.userEmail}</p>
                            <p><span>Телефон:</span> {props.userPhone}</p>
                            <span><p>{!props.goods[0].userId && 'не зареєстрований користувач'}</p></span>
                        </div>

                        <div className="orders-item-list__total"><span>Загальна сума:</span> {props.totalAmount} ₴</div>
                        {isAdmin && <AdminOrderDelete id={props.id} orderNumber={props.orderNumber} />}
                    </>}
            </li>
        </>
    )
}

export default OrdersListItem
