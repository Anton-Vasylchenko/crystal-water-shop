import React from 'react';
import Container from '../UI/container'
import OrdersListItem from './orders-list-item';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setOrdersPage } from '../../redux/actions';
import Pagination from '../UI/pagination';

import './orders-list.scss';
import { UserRoles } from '../../utils/consts';

function OrdersList() {
    const dispatch = useDispatch();

    const { id, role } = useSelector(({ user }) => user);
    const { pageOrders, limit, items, isLoaded, totalCount } = useSelector(({ orders }) => orders);

    const ordersList = items && items.map((order, index) => <OrdersListItem key={order.orderNumber} {...order} />);

    React.useEffect(() => {
        if (role !== UserRoles.ADMIN) {
            dispatch(fetchOrders(pageOrders, limit, id))
        } else {
            dispatch(fetchOrders(pageOrders, limit))
        }
    }, [id, pageOrders, limit, dispatch, role]);

    const handleChangePage = (pageNumber) => {
        dispatch(setOrdersPage(pageNumber));
    }

    return (
        <Container title={'Мої замовлення'} isLoaded={isLoaded}>
            <ul>
                {ordersList.length === 0 ?
                    <p className="order-list-empty">Список замовлень відсутній</p> : ordersList}
            </ul>

            <Pagination
                currentPage={pageOrders}
                totalCount={totalCount}
                pageSize={limit}
                onPageChange={pageOrders => handleChangePage(pageOrders)}
            />
        </Container>
    )
}

export default OrdersList
