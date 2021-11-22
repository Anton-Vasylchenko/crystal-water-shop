import React from 'react';
import Container from '../UI/container'
import OrdersListItem from './orders-list-item';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setOrdersPage } from '../../redux/actions';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../UI/pagination';

import './orders-list.scss';
import { UserRoles } from '../../utils/consts';

function OrdersList() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { id, isAuth, role } = useSelector(({ user }) => user);
    const { page, limit, items, isLoaded, totalCount } = useSelector(({ orders }) => orders);

    const ordersList = items && items.map((order, index) => <OrdersListItem key={order.orderNumber} {...order} />);

    React.useEffect(() => {
        if (role !== UserRoles.ADMIN) {
            dispatch(fetchOrders(page, limit, id))
        } else {
            dispatch(fetchOrders(page, limit))
        }
    }, [id, page, limit]);

    const handleChangePage = (pageNumber) => {
        dispatch(setOrdersPage(pageNumber));
    }

    return (
        <Container title={'Мої замовлення'} isLoaded={isLoaded}>
            <ul>
                {ordersList.length === 0 ? <p>Список замовлень відсутній</p> : ordersList}
            </ul>

            <Pagination
                currentPage={page}
                totalCount={totalCount}
                pageSize={limit}
                onPageChange={page => handleChangePage(page)}
            />
        </Container>
    )
}

export default OrdersList
