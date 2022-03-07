import React from 'react';
import { Table } from 'react-bootstrap';
import OrderTableItem from './order-table-item';

import './orders-table.scss';

function OrdersTable(props) {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Назва</th>
                    <th>Кількість</th>
                    <th>Сума</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => <OrderTableItem key={item.id} item={item} />)}
            </tbody>
        </Table>
    )
}

export default OrdersTable
