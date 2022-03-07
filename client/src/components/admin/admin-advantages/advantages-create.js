import React from 'react';
import { Button } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import AdvantagesForm from './advantages-form';
import { createAdvantages } from '../../../services/productsAPI';
import useAdminAdvantages from '../../../hooks/useAdminAdvantages';

import './advantages-create.scss';

function AdvantagesCreate() {

    const { onShowModalForm,
        onCloseModalForm,
        handleSubmit,
        isModalVisible } = useAdminAdvantages(createAdvantages);

    return (
        <div className="admin-advantages-create-btn">
            <Button variant="info" onClick={onShowModalForm}>
                <PlusCircleFill color="white" />
            </Button>

            <AdvantagesForm
                show={isModalVisible}
                handleNo={onCloseModalForm}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default AdvantagesCreate
