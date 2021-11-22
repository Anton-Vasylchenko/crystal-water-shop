import React from 'react'
import DropdownArrow from '../../UI/dropdown-arrow'
import { useDispatch } from 'react-redux';
import { fetchOrdersItems } from '../../../redux/actions/orders';

import './orders-list-item.scss';
import OrdersTable from '../orders-table';

function OrdersListItem(props) {
    const dispatch = useDispatch()

    const [dropdownOrder, setDropdownOrder] = React.useState(false);

    const showOrderDetailsHandler = () => {
        setDropdownOrder(prevState => !prevState);
    }

    React.useEffect(() => {
        dispatch(fetchOrdersItems(props.orderNumber));
    }, []);

    const orderImages = props.goods.map(item => item.img);

    const images = orderImages.slice(0, 3).map((img, index) => (
        <img key={index + img} src={`${process.env.REACT_APP_API_URL}products/${img}`} alt="poster" />
    ));

    const orderData = props.date.split('T')[0].split('-').join('/');

    return (
        <>
            <li className="orders-item-list" >
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

                    <DropdownArrow rotate={dropdownOrder} />
                </div>

                {dropdownOrder && <OrdersTable items={props.goods} />}

                {dropdownOrder && <div className="orders-item-list__total"><span>Загальна сума:</span> {props.totalAmount} ₴</div>}
            </li>
        </>
    )
}

export default OrdersListItem
