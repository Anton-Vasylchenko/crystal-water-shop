import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Col, Button, Alert } from 'react-bootstrap';
import { changePassword } from '../../../../services/userAPI';
import { isFiveChars, isEmpty } from '../../../../helpers/isValidInput';
import './change-password-form.scss';

function ChangePasswordForm() {
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [currentPasswordInput, setCurrentPasswordInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [serverError, setServerError] = useState('');

    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
    });

    const { id } = useSelector(({ user }) => user);

    const updateErrors = (inputName, msg) => {
        setErrors(state => {
            return {
                ...state,
                [inputName]: msg
            }
        })
    }

    const onChangePasswordHandler = (e) => {
        setShowForm(prevState => !prevState);
    }

    const onChangeCurrentPasswordInput = (e) => {
        setCurrentPasswordInput(e.target.value);

        updateErrors('currentPassword', '');
    }

    const onChangeNewPasswordInput = (e) => {
        setNewPasswordInput(e.target.value);

        updateErrors('newPassword', '');
    }

    const onSavePassword = () => {
        if (isEmpty(currentPasswordInput)) {
            updateErrors('currentPassword', 'Ваш пароль не збігається');
            return;
        }

        if (!isFiveChars(newPasswordInput)) {
            updateErrors('newPassword', 'Пароль повинен бути не коротшим 5 символів');
            return;
        }

        changePassword(currentPasswordInput, newPasswordInput, id).then(data => {
            onChangePasswordHandler();
        }).catch(error => {
            setServerError('Невірний поточний пароль');
        });
    }

    return (
        <div>
            {showForm && <Modal size="lg" animation={true} show={showForm} onHide={onChangePasswordHandler}>
                <Modal.Header closeButton>
                    <Modal.Title> Зміна паролю </Modal.Title>
                </Modal.Header>

                {serverError.length !== 0 && <Alert variant="danger" className="m-2">
                    {serverError}
                </Alert>}

                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="currentPasswrod">
                                <Form.Label>
                                    Поточний пароль
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={currentPasswordInput}
                                    onChange={onChangeCurrentPasswordInput}
                                    placeholder="Введіть ваш поточний пароль"
                                />
                                {errors.currentPassword.length !== 0 && <p className="error-input">{errors.currentPassword}</p>}
                            </Form.Group>
                        </Form.Row>

                        <br />

                        <Form.Row>
                            <Form.Group as={Col} controlId="phone">
                                <Form.Label>
                                    Новий пароль
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={newPasswordInput}
                                    onChange={onChangeNewPasswordInput}
                                    placeholder="Введіть, будь ласка, новий пароль"
                                />
                                {errors.newPassword.length !== 0 && <p className="error-input">{errors.newPassword}</p>}
                            </Form.Group>
                        </Form.Row>

                        <br />

                        <hr />

                        <Button variant="secondary" onClick={onChangePasswordHandler}>
                            Відмінити
                        </Button>

                        <Button className="m-2" variant="primary" id="btn" type="button" onClick={onSavePassword}>
                            Зберегти
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>}
            <span>
                <button className="change-password-btn"
                    onClick={onChangePasswordHandler}>Змінити пароль</button>
            </span>
        </div>
    );
}

export default ChangePasswordForm;
