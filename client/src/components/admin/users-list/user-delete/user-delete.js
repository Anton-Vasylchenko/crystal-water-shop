import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../../../../services/userAPI';
import ModalBox from '../../../UI/modal-box';

function UserDelete(props) {
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const onDeleteHandler = () => {
        deleteUser(props.id).then(data => {
            if (data) {
                props.onDeleteUser(props.id);
            }
        })
    }

    const onTogglePopup = () => {
        setShowDeletePopup(prevState => !prevState);
    }

    return <>
        <ModalBox
            show={showDeletePopup}
            onHide={onTogglePopup}
            handleYes={onDeleteHandler}
            handleNo={onTogglePopup}
            title={`Видалення користувача`}
            body={`Ви дійсно бажаєте видалити користувача ${props.name}`}
        />

        <Button variant="danger" onClick={onTogglePopup}>X</Button>
    </>;
}

export default UserDelete;
