import React from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { CheckLg } from 'react-bootstrap-icons';
import { Button, Form } from 'react-bootstrap';
import ModalBox from '../../UI/modal-box';

import './admin-categories.scss';

function EditCategoriesListItem({ name, id, index, handleDelete, handleUpdate }) {

    const [stateDeleteModal, setShowDeleteModal] = React.useState(false);
    const [stateEditInput, setEditInput] = React.useState(false);
    const [categoryValue, setCategoryValue] = React.useState(name);

    const onDelete = () => {
        handleDelete(id, index)
        setShowDeleteModal(false)
    }

    const onShowEdit = () => {
        setEditInput(!stateEditInput);
        setCategoryValue(name);
    }

    const onCancelDelete = () => {
        setShowDeleteModal(false);
    }

    const onShowDelete = () => {
        setShowDeleteModal(true);
    }

    const onUpdate = () => {
        if (!categoryValue || !categoryValue.replace(/\s/g, '').length) {
            return
        }

        handleUpdate(id, categoryValue);
        setEditInput(false);
    }

    return (
        <>
            <ModalBox
                show={stateDeleteModal}
                handleNo={onCancelDelete}
                handleYes={onDelete}
                title={'Видалення'}
                body={`Ви дійсно бажаєте видалити категорію "${name}"?`}
            />

            <li className="list-group-item text-center" key={`${id}`}>

                {stateEditInput ? <Form className="d-flex justify-content-center">
                    <Form.Control
                        value={categoryValue}
                        placeholder={"Введіть назву категорії"}
                        onChange={e => setCategoryValue(e.target.value)}
                        className="edit-input"
                    />
                    <Button onClick={onUpdate} className="ml-4"><CheckLg /></Button>
                </Form> : <b>{name}</b>}

                <div className="d-inline text-right d-block">
                    <Button
                        onClick={onShowDelete}
                        variant="outline-danger"
                        className="m-2"
                    >
                        <TrashFill />
                    </Button>

                    <Button variant="outline-success" onClick={onShowEdit} >
                        <PencilSquare />
                    </Button>
                </div>
            </li>
        </>
    )
}

export default EditCategoriesListItem
