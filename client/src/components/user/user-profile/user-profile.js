import React from 'react';
import Container from '../../UI/container';
import { useSelector, useDispatch } from 'react-redux';
import { PencilSquare } from 'react-bootstrap-icons';
import { setUser } from '../../../redux/actions';
import { updateUser } from '../../../services/userAPI';
import ProfileEditForm from './profile-edit-form/profile-edit-form';

import './user-profile.scss';
import { UserDefault } from '../../../utils/consts';

function UserProfile(props) {
    const dispatch = useDispatch();

    const { id, image, name, email, phone } = useSelector(({ user }) => user);

    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [isLoaded, setIsLoading] = React.useState(true);

    const onShowFormHandler = () => {
        setIsFormVisible(prevState => !prevState);
    }

    const onSaveProfile = (profile) => {
        try {
            setIsLoading(false);
            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('email', profile.email);
            formData.append('phone', profile.phone);

            typeof profile.image !== 'string' && formData.append('image', profile.image);

            updateUser(formData, id).then(data => {
                profile.image = data.image;
                dispatch(setUser(profile))
                setIsLoading(true);
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const imgUrl = !image ? UserDefault.IMAGE : image;

    return (
        <Container title="Профіль" isLoaded={isLoaded}>
            {!isFormVisible ? <div className="user-profile">
                <div className="user-profile__image">
                    <img src={`${process.env.REACT_APP_API_URL}users/${imgUrl}`} alt="user-avatar" />
                </div>
                <div className="user-info">
                    <div className="edit-profile-btn" onClick={onShowFormHandler}>
                        <PencilSquare />
                    </div>
                    <div className="user-profile__item">
                        <span>Ім'я: </span>
                        {name}
                    </div>
                    <div className="user-profile__item">
                        <span>Email: </span>
                        {email}
                    </div>
                    <div className="user-profile__item">
                        <span>Номер телефону: </span>
                        {!phone ? '---' : phone}
                    </div>
                </div>
            </div>
                :
                <ProfileEditForm
                    image={imgUrl}
                    name={name}
                    email={email}
                    phone={phone}
                    onShowFormHandler={onShowFormHandler}
                    onSaveProfile={onSaveProfile}
                />
            }
        </Container>
    )
}

export default UserProfile
