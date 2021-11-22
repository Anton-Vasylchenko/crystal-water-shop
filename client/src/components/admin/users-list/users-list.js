import React from 'react';
import Container from '../../UI/container';
import apiServices from '../../../services/api-services';
import UserItem from './user-item';
import { Table } from 'react-bootstrap';
import Pagination from '../../UI/pagination'

import './users-list.scss';

function UsersList() {
    const [users, setUsers] = React.useState('');
    const [totalCount, setTotalCount] = React.useState(5);
    const [page, setPage] = React.useState(1);

    const limit = 9;

    React.useEffect(() => {
        getUsers();
    }, [page])

    const getUsers = () => {
        apiServices.getUsers(limit, page).then(data => {
            setUsers(data.rows);
            setTotalCount(data.count)
        })
    }

    return (
        <Container title={'Список зареєстрованих користувачів'}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length !== 0 &&
                        users.map((user, index) => (
                            <UserItem
                                key={user.id}
                                index={index}
                                pageLimit={limit}
                                page={page}
                                {...user}
                            />
                        ))}
                </tbody>
            </Table>

            <Pagination
                currentPage={page}
                totalCount={totalCount}
                pageSize={limit}
                onPageChange={page => setPage(page)}
            />
        </Container>
    )
}

export default UsersList
