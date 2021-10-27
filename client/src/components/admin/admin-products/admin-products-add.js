import React from 'react'
import CreateProduct from '../modals/create-product';
import { Button } from 'react-bootstrap';
import { createProduct } from '../../../services/productsAPI';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoods } from '../../../redux/actions';

import './admin-products.scss'

function AdminProductsAdd() {
    const dispatch = useDispatch();
    const { activeCategory, sortBy, sortOrder } = useSelector(({ filters }) => filters);

    const [modalVisible, setModalVisible] = React.useState(false);

    const onShow = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const handleSubmit = (product) => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('categoryId', activeCategory);
            formData.append('img', product.img);

            createProduct(formData).then(data => {
                dispatch(fetchGoods(sortBy, activeCategory, sortOrder));
                // setModalVisible(false);
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="addBtnProduct text-center mb-4">
            <Button onClick={onShow}> Додати продукт </Button>
            <CreateProduct
                show={modalVisible}
                handleNo={closeModal}
                handleSubmit={handleSubmit}
                action={'create'}
                currentCategory={activeCategory}
            />
        </div>

    )
}

export default AdminProductsAdd
