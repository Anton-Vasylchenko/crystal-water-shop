import React from 'react';
import { Modal, Button, Form, Alert, Col } from 'react-bootstrap';

function CreateAdvantages({ show, handleNo, handleSubmit }) {
    const [error, setError] = React.useState(false);
    const [textCount, setTextCount] = React.useState(0);

    const [inputsValue, setInputsValue] = React.useState({
        text: '',
        img: '',
    });

    const updateState = (field, newValue) => {
        field === 'text' && setTextCount(newValue.length);

        setInputsValue({
            ...inputsValue,
            [field]: newValue
        });
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (!inputsValue.text.replace(/\s/g, '').length) {
            showErrorMsg('Помилка! Товар не може бути без назви!');
            return;
        }

        for (let key in inputsValue) {
            if (inputsValue[key] === '' && typeof inputsValue.img !== 'object') {
                showErrorMsg('Помилка! Заповнено не всі поля');
                return;
            }
        }

        const img = inputsValue.img;

        const fileType = img.type.split('/')[0];

        if (fileType !== 'image') {
            showErrorMsg('Помилка! Заборонений тип файлу!');
            return;
        }

        if (textCount > 60) {
            showErrorMsg(`Помилка! Ім'я не повинно перевищувати 27 символів`);
            return;
        }

        const product = {
            ...inputsValue
        }

        clearForm();

        handleNo();
        handleSubmit(product);
    }

    const onCancelHandle = () => {
        handleNo();
        setError(false);
    }

    const clearForm = () => {
        setInputsValue({
            text: '',
            img: '',
        });

        setTextCount(0);
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
        <div onClick={e => e.stopPropagation()}>
            <Modal size="lg" animation={true} show={show} onHide={onCancelHandle}>
                <Modal.Header closeButton>
                    <Modal.Title>Створити новий пункт</Modal.Title>
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
                                        className={textCount > 60 ? 'text-danger' : ''}>
                                        ({textCount})</span>
                                    </b>
                                </Form.Label>
                                <Form.Control
                                    onChange={e => updateState('text', e.target.value)}
                                    type="text"
                                    placeholder="Введіть основний текст"
                                    value={inputsValue.text}
                                />
                            </Form.Group>

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
                            Створити
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CreateAdvantages
