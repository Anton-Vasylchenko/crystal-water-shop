import React from 'react';
import { Button } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import EditAdvantages from '../modals/edit-advantages';
import { useDispatch } from 'react-redux';
import { fetchAdvantages } from '../../../redux/actions';
import { updateAdvantages } from '../../../services/productsAPI';

function AdminAdvantagesEdit({ item }) {
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
            formData.append('title', adv.title);
            typeof adv.img !== 'string' && formData.append('img', adv.img);
            updateAdvantages(adv.id, formData).then(data => {
                dispatch(fetchAdvantages());
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <Button className="m-1 btn-success" onClick={onShow}><PencilSquare /></Button>

            <EditAdvantages
                show={modalVisible}
                handleNo={closeModal}
                handleSubmit={handleSubmit}
                itemDetails={item}
            />
        </div>
    )
}

export default AdminAdvantagesEdit
