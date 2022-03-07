import React, { useState } from 'react';
import { Modal, Button, Col, Form, Alert } from 'react-bootstrap';
import { ImgUrlDefault } from '../../../utils/consts';

function AdvantagesForm({ show, handleNo, handleSubmit, itemDetails }) {
    const [error, setError] = useState(false);

    const [titleCount, setTitleCount] = useState(
        itemDetails ? itemDetails.title.length : 0
    );

    const [selectedImage, setSelectedImage] = useState('')

    const [inputsValue, setInputsValue] = useState(
        !itemDetails ? { title: '', img: '' } : { ...itemDetails }
    );

    const onChangeTitle = (e) => {
        const title = e.target.value;

        setTitleCount(title.length);

        setInputsValue(prevState => {
            return {
                ...prevState,
                title
            }
        });
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();

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

        if (titleCount > 80) {
            showErrorMsg(`Помилка! Текст не повинен перевищувати 80 символів`);
            return;
        }

        if (inputsValue.price > 2147483647) {
            showErrorMsg(`Помилка! Невірно вказана ціна`);
            return;
        }

        const product = {
            ...inputsValue
        }

        onCancelHandle();
        handleSubmit(product);
    }

    const onCancelHandle = () => {
        handleNo();
        clearForm();
    }

    const clearForm = () => {
        setInputsValue(!itemDetails ?
            { title: '', img: '' } : { ...itemDetails });

        setSelectedImage('');

        setTitleCount(itemDetails ? itemDetails.title.length : 0);
        setError(false);
    }

    const selectFile = (e) => {
        setSelectedImage(e.target.files[0]);

        setInputsValue(prevState => {
            return {
                ...prevState,
                img: e.target.files[0]
            }
        });
    }

    const showErrorMsg = (text) => {
        setError(text);
    }

    const imgUrl = selectedImage.length === 0 ?
        `${ImgUrlDefault.ADVANTAGES}${inputsValue.img}` : URL.createObjectURL(selectedImage);

    return (
        <>
            <Modal size="lg" animation={true} show={show} onHide={onCancelHandle}>
                <Modal.Header closeButton>
                    <Modal.Title>Редагування</Modal.Title>
                </Modal.Header>

                {error && <Alert className="m-2" variant={'danger'}>
                    {error}
                </Alert>}

                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>
                                    <b>Текст: <span
                                        className={titleCount > 80 ? 'text-danger' : ''}>
                                        ({titleCount})</span>
                                    </b>
                                </Form.Label>
                                <Form.Control
                                    onChange={onChangeTitle}
                                    type="text"
                                    placeholder="Enter the product name"
                                    value={inputsValue && inputsValue.title}
                                />
                            </Form.Group>

                            {inputsValue.img &&
                                <div className="shop-item-details__image mt-2 bg-secondary">
                                    <img src={imgUrl} alt="item pictures" />
                                </div>}

                            <Form.Group as={Col} controlId="formGridImage" className="mt-4">
                                <Form.Control
                                    onChange={selectFile}
                                    type="file"
                                    placeholder="Enter the image url"
                                />
                            </Form.Group>

                        </Form.Row>

                        <hr />

                        <Button variant="secondary" onClick={onCancelHandle}>
                            Відмінити
                        </Button>

                        <Button className="m-2" variant="primary" type="button" onClick={onHandleSubmit}>
                            Зберегти
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdvantagesForm;

