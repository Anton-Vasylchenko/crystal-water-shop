import React from 'react';
import { Button } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { AdvantagesFormCreate } from '.';
import { createAdvantages } from '../../../services/productsAPI';
import { fetchAdvantages } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

import './advantages-create.scss';

function AdvantagesCreate() {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);

    const onShow = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const handleSubmit = (adv) => {
        try {
            const formData = new FormData();
            formData.append('title', adv.text);
            formData.append('img', adv.img);
            createAdvantages(formData).then(data => {
                dispatch(fetchAdvantages());
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="admin-advantages-create-btn">
            <Button variant="info" onClick={onShow}>
                <PlusCircleFill color="white" />
            </Button>

            <AdvantagesFormCreate
                show={modalVisible}
                handleNo={closeModal}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default AdvantagesCreate
