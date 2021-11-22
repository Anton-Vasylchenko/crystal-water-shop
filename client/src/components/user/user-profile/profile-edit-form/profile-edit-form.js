import React from 'react';
import { Button, Col, Form, Alert, } from 'react-bootstrap';

import './profile-edit-form.scss';

function ProfileEditForm(props) {
    const [enteredName, setEnteredName] = React.useState(props.name);
    const [enteredEmail, setEnteredEmail] = React.useState(props.email);
    const [enteredPhone, setEnteredPhone] = React.useState(props.phone);
    const [selectedImage, setSelectedImage] = React.useState('')
    const [error, setError] = React.useState('')

    const onHideForm = () => {
        props.onShowFormHandler();
        setError('');
    }

    const selectFile = (e) => {
        const fileType = e.target.files[0].type.split('/')[0];
        if (fileType !== 'image') {
            setError('Помилка! Заборонений тип файла');
            return;
        }
        setError('');
        setSelectedImage(e.target.files[0]);
    }

    const onChangeNameHandler = (e) => {
        setError('');
        setEnteredName(e.target.value)
    }
    const onChangeEmailHandler = (e) => {
        setError('');
        setEnteredEmail(e.target.value)
    }
    const onChangePhoneHandler = (e) => {
        setError('');
        setEnteredPhone(e.target.value)
    }

    const onSubmitHandler = () => {
        if (enteredName.trim().length === 0) {
            setError('Помилка! Ім\'я не може бути порожнім');
            return;
        }

        if (!enteredEmail.includes('@') || enteredEmail.trim().length === 0) {
            setError('Помилка! Ви ввели не корректну пошту');
            return;
        }

        const newProfile = {
            name: enteredName,
            email: enteredEmail,
            phone: enteredPhone,
            image: selectedImage
        }

        props.onSaveProfile(newProfile);
        onHideForm();
    }

    const imgUrl = selectedImage.length === 0 ?
        `${process.env.REACT_APP_API_URL}users/${props.image}` : URL.createObjectURL(selectedImage);

    return (
        <Form onSubmit={onSubmitHandler} >

            {error && <Alert className="m-2" className="profile-edit__error" variant={'danger'}>
                {error}
            </Alert>}

            <div className="user-profile">
                <div className="user-profile__image profile-edit-form__image">

                    <img src={`${imgUrl}`} alt="user-avatar" />

                    <Form.Control
                        onChange={selectFile}
                        type="file"
                        placeholder="Enter the image url"
                    />

                </div>

                <div className="user-info">
                    <div className="user-profile__item">
                        <span>
                            Ім'я:
                        </span>
                        <Form.Control
                            type="text"
                            placeholder="Введіть ваше ім'я"
                            value={enteredName}
                            onChange={onChangeNameHandler}
                        />
                    </div>
                    <div className="user-profile__item">
                        <span>Email: </span>
                        <Form.Control
                            type="text"
                            placeholder="Введіть вашу пошту"
                            value={enteredEmail}
                            onChange={onChangeEmailHandler}
                        />
                    </div>
                    <div className="user-profile__item">
                        <span>Телефон: </span>
                        <Form.Control
                            type="number"
                            placeholder="Введіть ваш мобільний номер"
                            value={enteredPhone}
                            onChange={onChangePhoneHandler}
                        />
                    </div>
                </div>
            </div>
            <div className="profile-edit-form__nav">
                <Button variant="secondary" onClick={onHideForm}>
                    Відмінити
                </Button>

                <Button className="m-2" variant="primary" type="button" onClick={onSubmitHandler}>
                    Зберегти
                </Button>
            </div>
        </Form>
    )
}

export default ProfileEditForm
