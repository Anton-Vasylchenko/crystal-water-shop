import React from 'react';
import { TrashFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import PopupDelete from '../popup-delete';
import { deleteAdvantages } from '../../../services/productsAPI';
import { useDispatch } from 'react-redux';
import { fetchAdvantages } from '../../../redux/actions';

function AdvantagesDelete({ name, id }) {
    const dispatch = useDispatch();
    const [show, setShow] = React.useState(false);

    const handleNo = () => setShow(false);

    const handleYes = () => {
        toggleShow();
        deleteAdvantages(id).then(data => {
            dispatch(fetchAdvantages());
        })
    };

    const toggleShow = () => {
        setShow(!show);
    };

    return (
        <div>
            <Button onClick={toggleShow} className="m-1 btn-danger"><TrashFill /></Button>

            <PopupDelete
                show={show}
                handleNo={handleNo}
                handleYes={handleYes}
                name={name}
            />
        </div>
    )
}

export default AdvantagesDelete
