import React from 'react';
import { TrashFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import ModalBox from '../../UI/modal-box';
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
            <Button onClick={toggleShow} className="m-1 btn-danger">
                <TrashFill />
            </Button>

            <ModalBox
                show={show}
                handleNo={handleNo}
                handleYes={handleYes}
                body={`Ви дійсно бажаєте видалити: "${name}" ?`}
                title={`Видалення: "${name}"`}
            />
        </div>
    )
}

export default AdvantagesDelete
