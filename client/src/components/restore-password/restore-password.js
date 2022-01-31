import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { forgotPassword } from '../../services/userAPI';
import ModalBox from '../UI/modal-box';

import './restore-password.scss';

function RestorePassword() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [errorIsNotExist, setIsNotExist] = useState(false);
    const [showMsgSuccess, setShowMsgSuccess] = useState(false);

    const onShowRestorePasswordModal = (e) => {
        setShowModal(prevState => !prevState);
        setShowMsgSuccess(false);
    }

    const onSaveRestorePassword = async () => {
        const data = await forgotPassword(email);

        if (!data) {
            setIsNotExist(true);
            return;
        }
        setEmail('');
        setShowMsgSuccess(true);
        setIsNotExist(false);
    }

    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value)
        setIsNotExist(false);
    }

    const resetPasswordInput = <div className="form-outline mb-4">
        {errorIsNotExist && <Alert variant={'danger'}> Користувач з такою поштою не зареєстрований </Alert>}
        <label className="form-label" className="reset-form-label" htmlFor="email">Введіть вашу пошту:</label>
        <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={onChangeEmailHandler}
        />
    </div>

    const successMessage = <Alert variant={"success"}>
        На вказану пошту відправлено лист з інструкцією для відновлення паролю
    </Alert>

    return <>
        <div onClick={onShowRestorePasswordModal}
            className="restore-password"
            href="#">Забули пароль?
        </div>

        <ModalBox
            body={!showMsgSuccess ? resetPasswordInput : successMessage}
            title="Відновлення паролю"
            show={showModal}
            handleNo={onShowRestorePasswordModal}
            handleYes={!showMsgSuccess ? onSaveRestorePassword : onShowRestorePasswordModal}
        />
    </>
}

export default RestorePassword;
