import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAdvantages } from '../redux/actions';

function useAdminAdvantages(request) {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onShowModalForm = () => {
        setIsModalVisible(true)
    }

    const onCloseModalForm = () => {
        setIsModalVisible(false)
    }

    const handleSubmit = (advantage) => {
        try {
            const formData = new FormData();
            formData.append('title', advantage.title);
            typeof advantage.img !== 'string' && formData.append('img', advantage.img);

            const reqData = advantage.id ?
                { id: advantage.id, item: formData } : formData

            request(reqData).then(data => {
                dispatch(fetchAdvantages());
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return {
        onShowModalForm,
        onCloseModalForm,
        handleSubmit,
        isModalVisible
    }
}

export default useAdminAdvantages;
