import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button, Col, Alert } from 'react-bootstrap';
import { sendEmail } from '../../services/sendMail';
import { clearCart } from "../../redux/actions"

import './form-buy.scss';

function FormBuy() {
    const dispatch = useDispatch();
    const [enteredName, setEnteredName] = React.useState('');
    const [enteredPhone, setEnteredPhone] = React.useState('');

    const [showPopup, setShowPopup] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleNo = () => {
        setShowPopup(false);
    }

    const formShowHandler = () => {
        setShowPopup(true);
    }

    const handleSubmit = () => {
        if (enteredName.trim().length === 0) {
            setError("Ви не ввели ваше ім'я!");
            return;
        }

        if (enteredPhone.trim().length === 0) {
            setError("Ви не ввели мобільний номер!");
            return;
        }

        sendOrderToEmail();

        dispatch(clearCart());
        handleNo();
    }

    const sendOrderToEmail = () => {
        try {
            const formData = new FormData();
            formData.append('name', enteredName);
            formData.append('phone', enteredPhone);

            sendEmail(formData).then(data => {
                // dispatch(fetchAdvantages());

                console.log(data)
            })

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const nameChangeHandler = (e) => {
        setError('');
        setEnteredName(e.target.value);
    }

    const phoneChangeHandler = (e) => {
        setError('');
        setEnteredPhone(e.target.value);
    }

    return (
        <>
            <div className="cart-bottom__buy-btn unselectable-text" onClick={formShowHandler}>Замовити</div>

            <div onClick={e => e.stopPropagation()}>
                <Modal size="lg" animation={true} show={showPopup} onHide={handleNo}>

                    {error && <Alert className="m-2" variant={'danger'}>
                        {error}
                    </Alert>}

                    <Modal.Header closeButton>
                        <Modal.Title> Оформлення замовлення </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>
                                        Прізвище, ім'я та по батькові
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={nameChangeHandler}
                                        value={enteredName}
                                        placeholder="Введіть, будь ласка, ваше прізвище, ім'я та по батькові"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <br />

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>
                                        Номер телефону
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={enteredPhone}
                                        onChange={phoneChangeHandler}
                                        placeholder="Введіть, будь ласка, ваш мобільний номер"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <hr />

                            <Button variant="secondary" onClick={handleNo}>
                                Відмінити
                            </Button>

                            <Button className="m-2" variant="primary" type="button" onClick={handleSubmit}>
                                Купити
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default FormBuy
