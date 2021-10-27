import React from 'react';
import PopupDelete from '../modals/popup-delete';
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
            <PopupDelete
                show={show}
                handleNo={handleNo}
                handleYes={handleYes}
                name={name}
            />

            <div className="product-del" onClick={toggleShow}>x</div>
        </>
    )
}

export default AdminProductDelete
