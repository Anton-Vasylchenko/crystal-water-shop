import React from 'react';
import { Button } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import AdvantagesForm from './advantages-form';
import { updateAdvantages } from '../../../services/productsAPI';
import useAdminAdvantages from '../../../hooks/useAdminAdvantages';

function AdvantagesEdit({ item }) {

    const { onShowModalForm,
        onCloseModalForm,
        handleSubmit,
        isModalVisible } = useAdminAdvantages(updateAdvantages);

    return (
        <div>
            <Button className="m-1 btn-success" onClick={onShowModalForm}>
                <PencilSquare />
            </Button>

            <AdvantagesForm
                show={isModalVisible}
                handleNo={onCloseModalForm}
                handleSubmit={handleSubmit}
                itemDetails={item}
            />
        </div>
    )
}

export default AdvantagesEdit
