import React from 'react'
import { PlusCircleFill } from 'react-bootstrap-icons';
import { createCategory } from '../../../services/productsAPI';
import { fetchCategories } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

import './admin-categories.scss'

function CreateCategories() {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [categoryValue, setCategoryValue] = React.useState('');

    const onShow = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const saveNewCategory = () => {
        createCategory({ name: categoryValue })
            .then(data => {
                setModalVisible(false);
                dispatch(fetchCategories());
                setCategoryValue('');
            })
    }

    return (
        <div className="addBtnCategories" onClick={onShow}>
            <PlusCircleFill />

            <div onClick={e => e.stopPropagation()}>
                <Modal
                    show={modalVisible}
                    onHide={closeModal}
                    size="lg"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Добавити категорію
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Control
                                value={categoryValue}
                                placeholder={"Введіть назву категорії"}
                                onChange={e => setCategoryValue(e.target.value)}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={closeModal}>Закрити</Button>
                        <Button variant="outline-success" onClick={saveNewCategory}>Додати</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>

    )
}

export default CreateCategories
