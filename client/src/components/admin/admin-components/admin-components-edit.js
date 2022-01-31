import React from 'react';

import { PencilSquare } from 'react-bootstrap-icons';
import { Modal, Form, Button, Alert, Col } from 'react-bootstrap';
import TextEditor from '../text-editor';
import { updateComponent } from '../../../services/productsAPI';

import './admin-components.scss';

function AdminComponentsEdit({ data, updateData }) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [nameCount, setNameCount] = React.useState(0);
    const [inputsValue, setInputsValue] = React.useState({ ...data });

    React.useEffect(() => {
        setInputsValue({ ...data })
    }, [data])

    const onShow = () => {
        setInputsValue({ ...data })
        setNameCount(data.title.length)
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const onHandleSubmit = () => {
        if (typeof inputsValue.img === 'object') {
            const img = inputsValue.img;

            const fileType = img.type.split('/')[0];

            if (fileType !== 'image') {
                showErrorMsg('Помилка! Заборонений тип файлу!');
                return;
            }
        }

        for (let key in inputsValue) {
            if (inputsValue[key] === '') {
                showErrorMsg('Помилка! Заповнено не всі поля');
                return;
            }
        }

        if (!inputsValue.title.replace(/\s/g, '').length) {
            showErrorMsg('Помилка! Не вказана назва!');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', inputsValue.title);
            formData.append('text', inputsValue.text);
            typeof inputsValue.img !== 'string' && formData.append('img', inputsValue.img);
            updateComponent(data.id, formData).then(data => {
                updateData();
                closeModal();
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const updateState = (field, newValue) => {
        field === 'title' && setNameCount(newValue.length);

        setInputsValue({
            ...inputsValue,
            [field]: newValue
        });
    }

    const selectFile = (e) => {
        setInputsValue({
            ...inputsValue,
            img: e.target.files[0]
        });
    }

    const showErrorMsg = (text) => {
        setError(text);
    }

    return (
        <>
            <div className="editBtn" onClick={onShow}>
                <PencilSquare />
            </div>

            <div onClick={e => e.stopPropagation()}>

                <Modal size="lg" animation={true} show={modalVisible} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редагувати товар</Modal.Title>
                    </Modal.Header>

                    {error && <Alert className="m-2" variant={'danger'}>
                        {error}
                    </Alert>}

                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>
                                        <b>Заголовок: <span
                                            className={nameCount > 60 ? 'text-danger' : ''}>
                                            ({nameCount})</span>
                                        </b>
                                    </Form.Label>
                                    <Form.Control
                                        onChange={e => updateState('title', e.target.value)}
                                        type="text"
                                        placeholder="Enter the product name"
                                        value={inputsValue && inputsValue.title}
                                    />
                                </Form.Group>

                                <div className="shop-item-details__image mt-2 admin-image-edit">
                                    <img src={`${process.env.REACT_APP_API_URL}components/${data.img}`} alt="item pictures" />
                                </div>

                                <Form.Group as={Col} controlId="formGridImage" className="mt-4">
                                    <Form.Control
                                        onChange={selectFile}
                                        type="file"
                                        placeholder="Enter the image url"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridDesc" className="mt-4">
                                <Form.Label> <b> Текст: </b> </Form.Label>

                                <TextEditor onChangeInfo={updateState} fieldName={'text'} content={inputsValue.text} />
                            </Form.Group>

                            <hr />

                            <Button variant="secondary" onClick={closeModal}>
                                Відмінити
                            </Button>

                            <Button className="m-2" variant="primary" type="button" onClick={onHandleSubmit}>
                                Зберегти
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </div>
        </>
    )
}

export default AdminComponentsEdit
