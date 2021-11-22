import React from 'react';
import './user-item.scss';
import { Form } from 'react-bootstrap';
import { UserRoles } from '../../../../utils/consts';
import { changeRole } from '../../../../services/userAPI';
import { useSelector } from 'react-redux';

function UserItem(props) {
    const { page,
        pageLimit,
        index,
        id,
        role,
        email,
        name } = props;

    const { id: idUserLogined } = useSelector(({ user }) => user);

    let userNumber = props.page === 2 ?
        index + pageLimit : page * pageLimit - pageLimit + index;


    const changeRoleHandler = (e) => {
        changeRole(id, e.target.value);
    }

    return (
        <tr>
            <td>{userNumber + 1}</td>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                {idUserLogined !== id ?
                    <Form.Control as="select" defaultValue={role} onChange={changeRoleHandler}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MODERATOR">MODERATOR</option>
                        <option value="USER">USER</option>
                    </Form.Control> : role
                }
            </td>
        </tr >
    )
}

export default UserItem
