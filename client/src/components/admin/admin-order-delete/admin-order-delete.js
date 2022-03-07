import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './admin-order-delete.scss';
import { deleteOrders } from '../../../services/productsAPI';
import { fetchOrders, setOrdersPage } from '../../../redux/actions';
import ModalBox from '../../UI/modal-box';

function AdminOrderDelete(props) {
    const dispatch = useDispatch();

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const { pageOrders, limit, items } = useSelector(({ orders }) => orders);

    const onDeleteHandler = () => {
        deleteOrders(props.id).then(data => {
            dispatch(fetchOrders(pageOrders, limit))
            if (items.length === 1 && pageOrders > 1) {
                dispatch(setOrdersPage(pageOrders - 1))
            }
        })

        onShowPopupHandler();
    }

    const onShowPopupHandler = () => {
        setShowDeletePopup(prevState => !prevState);
    }

    return <>
        <ModalBox
            show={showDeletePopup}
            onHide={onShowPopupHandler}
            handleNo={onShowPopupHandler}
            handleYes={onDeleteHandler}
            title={`Видалення замовлення`}
            body={`Ви дійсно бажаєте видалити замовлення №${props.orderNumber} ?`}
        />
        <div className="del-order-btn" onClick={onShowPopupHandler}>Видалити</div>
    </>
}

export default AdminOrderDelete;
