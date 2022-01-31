import React from 'react';
import ModalBox from '../../UI/modal-box';
import { deleteProduct } from '../../../services/productsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from '../../../redux/actions';

function AdminProductDelete({ id, name }) {
    const dispatch = useDispatch();
    const { activeCategory, sortBy, sortOrder } = useSelector(({ filters }) => filters);

    const [show, setShow] = React.useState(false);

    const handleNo = () => setShow(false);

    const handleYes = () => {
        toggleShow();

        deleteProduct(id).then(data => {
            dispatch(fetchGoods(sortBy, activeCategory, sortOrder));
        })
    };

    const toggleShow = () => {
        setShow(!show);
    };

    return (
        <>
            <ModalBox
                show={show}
                handleNo={handleNo}
                handleYes={handleYes}
                title={`Видалення: "${name}"`}
                body={`Ви дійсно бажаєте видалити товар "${name}"?`}
            />

            <div className="product-del" onClick={toggleShow}>x</div>
        </>
    )
}

export default AdminProductDelete
