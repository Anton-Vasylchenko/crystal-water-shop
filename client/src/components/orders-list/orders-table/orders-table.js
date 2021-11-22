import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './orders-table.scss';

function OrdersTable(props) {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Назва</th>
                    <th>Кількість</th>
                    <th>Сума</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => (
                    <tr>
                        <td className="order-table-img">
                            <img src={`${process.env.REACT_APP_API_URL}products/${item.img}`} alt="poster" />
                        </td>
                        <td>
                            <Link to={`/shop/${item.goodsId}`}>{item.name}</Link>
                        </td>
                        <td>{item.count}</td>
                        <td>{item.price * item.count} ₴</td>
                    </tr>
                ))}

            </tbody>
        </Table>


    )
}

export default OrdersTable
