import React from 'react';
import { Modal, Button, Col, Form, Alert } from 'react-bootstrap';

function EditAdvantages({ show, handleNo, handleSubmit, itemDetails }) {
    const [error, setError] = React.useState(false);
    const [titleCount, setTitleCount] = React.useState(itemDetails.title.length);

    const [inputsValue, setInputsValue] = React.useState({
        ...itemDetails
    });

    React.useEffect(() => {
        setInputsValue({ ...itemDetails })
    }, [itemDetails])

    const updateState = (field, newValue) => {
        field === 'title' && setTitleCount(newValue.length);

        setInputsValue({
            ...inputsValue,
            [field]: newValue
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
            showErrorMsg(`Помилка! Ім'я не повинно перевищувати 27 символів`);
            return;
        }

        if (inputsValue.price > 2147483647) {
            showErrorMsg(`Помилка! Невірно вказана ціна`);
            return;
        }

        const product = {
            ...inputsValue
        }

        handleNo();
        handleSubmit(product);
    }

    const onCancelHandle = () => {
        handleNo();
        clearForm();
    }

    const clearForm = () => {
        setInputsValue({
            ...itemDetails
        });

        setTitleCount(itemDetails.title.length);
        setError(false);
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
                                    onChange={e => updateState('title', e.target.value)}
                                    type="text"
                                    placeholder="Enter the product name"
                                    value={inputsValue && inputsValue.title}
                                />
                            </Form.Group>

                            <div className="item-details__image mt-2 bg-secondary">
                                <img src={`${process.env.REACT_APP_API_URL}advantages/${itemDetails.img}`} alt="item pictures" />
                            </div>

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

export default EditAdvantages;

