import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser, clearCart } from '../../redux/actions';
import { Modal, Form, Button, Col, Alert } from 'react-bootstrap';
import { sendEmail } from '../../services/sendMail';
import { registration } from '../../services/userAPI';
import { isEmpty, isFiveChars, isEmail } from '../../helpers/isValidInput';
import ModalBox from '../UI/modal-box';
import { serialize } from 'object-to-formdata';

import './order-form.scss';

function OrderForm() {
    const dispatch = useDispatch();

    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [showPopup, setShowPopup] = React.useState(false);
    const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);

    const { items } = useSelector(({ cart }) => cart);
    const { id, isAuth, name, email, phone } = useSelector(({ user }) => user);

    const [nameValue, setNameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailValue, setEmailValue] = useState('');

    const [errors, setErrors] = React.useState({
        name: true,
        phone: true,
        email: true,
        password: true
    });

    useEffect(() => {
        setNameValue(name)
        setPhoneValue(phone);
        setEmailValue(email)
    }, [])

    const handleNo = () => {
        setShowPopup(false);
        setErrors({
            name: true,
            phone: true,
            email: true,
            password: true
        });
        setCheckboxChecked(false);
    }

    const formShowHandler = () => { setShowPopup(true) }

    const handleSubmit = async (e) => {
        const enteredData = {
            name: nameValue,
            phone: phoneValue,
            email: emailValue,
            password: checkboxChecked ? passwordValue : ''
        }

        const enteredDataIsValid = {
            name: !isEmpty(enteredData.name),
            phone: !isEmpty(enteredData.phone),
            email: !isEmail(enteredData.email),
            password: checkboxChecked ? isFiveChars(enteredData.password) : true
        }

        setErrors({ ...enteredDataIsValid })

        let formIsValid = !Object.values(enteredDataIsValid).includes(false);

        if (!formIsValid) {
            return;
        }

        sendOrderToEmail().then(data => {
            if (data === false) {
                setUserExists(true);
                return;
            }

            handleNo();
            setShowSuccessMsg(true);
        });
    }

    const sendOrderToEmail = async () => {
        let userId = id;

        const userData = {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            phone: phoneValue
        }

        if (checkboxChecked) {
            try {
                const regData = await registration(userData.email, userData.password, userData.name, userData.phone).then(data => {
                    console.log(data)
                    dispatch(setUser(data))
                    dispatch(setIsAuth(true))
                    userId = data.id
                });
            } catch (e) {
                return false;
            }
        }

        try {
            const itemOrders = {};

            for (let key in items) {
                itemOrders[key] = { ...items[key][0] };
                itemOrders[key].count = items[key].length;
                itemOrders[key].userId = userId;
                itemOrders[key].userName = nameValue;
                itemOrders[key].userEmail = emailValue;
                itemOrders[key].userPhone = phoneValue;
            }

            const formData = serialize(
                itemOrders
            );

            sendEmail(formData);

        } catch (e) {
            alert(e.response.data.message)
        }

    }

    const nameChangeHandler = (e) => {
        setErrors(prevState => ({ ...prevState, name: true }));
        setNameValue(e.target.value);
    }

    const phoneChangeHandler = (e) => {
        setErrors(prevState => ({ ...prevState, phone: true }));
        setPhoneValue(e.target.value);
    }

    const emailChangeHandler = (e) => {
        setErrors(prevState => ({ ...prevState, email: true }));
        setUserExists(false);
        setEmailValue(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setErrors(prevState => ({ ...prevState, password: true }));
        setPasswordValue(e.target.value);
    }

    const checkboxChangeHandler = (e) => {
        setCheckboxChecked(e.target.checked);
    }

    const handleMsgClose = () => {
        setShowSuccessMsg(false)
        dispatch(clearCart());
    }

    return (
        <>
            <div className="cart-bottom__buy-btn unselectable-text" onClick={formShowHandler}>Замовити</div>

            {showSuccessMsg && <ModalBox
                show={showSuccessMsg}
                handleYes={handleMsgClose}
                title={`Замовлення успішно відправлено!`}
                body={`Дякуємо за ваше замовлення. Очікуйте телефонного дзвінка для уточнення деталей.`}
            />}

            <div onClick={e => e.stopPropagation()}>
                <Modal size="lg" animation={true} show={showPopup} onHide={handleNo}>
                    <Modal.Header closeButton>
                        <Modal.Title> Оформлення замовлення </Modal.Title>
                    </Modal.Header>

                    {userExists && <Alert variant="danger" className="m-2">
                        Користувач з даною поштовою скринькою вже існує
                    </Alert>}

                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="name">
                                    <Form.Label>
                                        Прізвище та ім'я
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={nameValue}
                                        onChange={nameChangeHandler}
                                        placeholder="Введіть, будь ласка, ваше прізвище та ім'я"
                                    />
                                </Form.Group>
                                {!errors.name && <Alert className="error-msg" variant='danger'>Помилка! Ви не ввели ваше ім'я</Alert>}
                            </Form.Row>

                            <br />

                            <Form.Row>
                                <Form.Group as={Col} controlId="phone">
                                    <Form.Label>
                                        Номер телефону
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        onChange={phoneChangeHandler}
                                        value={phoneValue ? phoneValue : ''}
                                        placeholder="Введіть, будь ласка, ваш мобільний номер"
                                    />
                                    {!errors.phone && <Alert className="error-msg" variant='danger'>Помилка! Ви не ввели номер телефону</Alert>}
                                </Form.Group>
                            </Form.Row>

                            <br />

                            <Form.Row>
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>
                                        Електронна скринька
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={emailChangeHandler}
                                        value={emailValue}
                                        placeholder="Введіть, будь ласка, ваш email"
                                    />
                                    {!errors.email && <Alert className="error-msg" variant='danger'>Помилка! Поштова скринька не корректна</Alert>}
                                </Form.Group>
                            </Form.Row>

                            <br />

                            {!isAuth && <Form.Check
                                type={'checkbox'}
                                id={`default-checkbox`}
                                label={`Зареєструватися`}
                                onChange={checkboxChangeHandler}
                            />}

                            {checkboxChecked &&
                                <div className="registration-section">
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="password">
                                            <Form.Label>
                                                Пароль
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                onChange={passwordChangeHandler}
                                                value={passwordValue}
                                                placeholder="Придумайте пароль"
                                            />
                                            {!errors.password &&
                                                <Alert className="error-msg" variant='danger'>
                                                    Пароль повинен налічувати не менше 5 символів
                                                </Alert>}
                                        </Form.Group>
                                    </Form.Row>
                                </div>
                            }

                            <hr />

                            <Button variant="secondary" onClick={handleNo}>
                                Відмінити
                            </Button>

                            <Button className="m-2" variant="primary" id="btn" type="button" onClick={handleSubmit}>
                                Купити
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default OrderForm
