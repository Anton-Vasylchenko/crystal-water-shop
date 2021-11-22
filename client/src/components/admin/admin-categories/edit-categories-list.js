import { ListCheck } from 'react-bootstrap-icons';
import { Modal, Button, Alert } from 'react-bootstrap';
import { fetchCategories } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../../redux/actions';
import EditCategoriesListItem from './edit-categories-list-item';
import { updateCategory, getProductByCatId, deleteCategory } from '../../../services/productsAPI';

import React from 'react';

import './admin-categories.scss';

function EditCategoriesList() {
    const dispatch = useDispatch();
    const { activeCategory, categories } = useSelector(({ filters }) => filters);
    const [isError, setIsError] = React.useState(false)

    const [modalVisible, setModalVisible] = React.useState(false);

    const onShow = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
        setIsError(false);
    }

    const handleDelete = (id, index) => {
        getProductByCatId(index).then(data => {
            if (data) {
                setIsError(true);
                return;
            }

            if (activeCategory === index) {
                dispatch(setActiveCategory(null));
            }

            deleteCategory(id).then(data => {
                dispatch(fetchCategories());
            })

            isError && setIsError(false);
        })
    }

    const handleUpdate = (id, name) => {
        const formData = new FormData();
        formData.append('name', name);

        updateCategory(formData, id).then(data => {
            dispatch(fetchCategories());
        })

        isError && setIsError(false);
    }

    const categoriesList = categories && categories.map((elem, index) => {
        return <EditCategoriesListItem
            name={elem.name}
            id={elem.id}
            index={index}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            key={elem.id} />
    })

    return (
        <div className="admin-list-check" onClick={onShow}>
            <ListCheck />

            <div onClick={e => e.stopPropagation()}>

                <Modal
                    show={modalVisible}
                    onHide={closeModal}
                    size="lg"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Список категорій
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {isError && <Alert variant='danger'>
                            Помилка! Ви не можете видалити категорію, у якій знаходяться товари
                        </Alert>}

                        <ul>
                            {categoriesList &&
                                categoriesList.length === 0 ?
                                <p className="text-center text-muted">Категорії відсутні</p> : categoriesList}
                        </ul>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={closeModal}>Закрити</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    )
}

export default EditCategoriesList

