import React from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Col, Form, Dropdown, Alert, } from 'react-bootstrap';
import TextEditor from '../text-editor';
import { fetchItemDetails } from '../../../redux/actions';
import { fetchCategories } from '../../../redux/actions';
import { updateProduct } from '../../../services/productsAPI';

import './admin-products.scss';

function AdminProductsEdit({ itemDetails }) {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);

    const [error, setError] = React.useState(false);
    const [nameCount, setNameCount] = React.useState(itemDetails.name.length);
    const [itemCatId, setItemCatId] = React.useState(itemDetails.categoryId);

    const [inputsValue, setInputsValue] = React.useState({
        ...itemDetails
    });

    const { categories } = useSelector(({ filters }) => filters);

    const onShow = () => {
        setModalVisible(true);
        setItemCatId(itemDetails.categoryId)

        setInputsValue({
            ...itemDetails
        });
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    const handleSubmit = (product) => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            typeof product.img !== 'string' && formData.append('img', product.img);
            formData.append('categoryId', product.categoryId);
            updateProduct(formData, itemDetails.id).then(data => {
                dispatch(fetchItemDetails(itemDetails.id));
                // setModalVisible(false);
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    // -------------------------------------

    const updateState = (field, newValue) => {
        field === 'name' && setNameCount(newValue.length);

        setInputsValue({
            ...inputsValue,
            [field]: newValue
        });
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (typeof inputsValue.img === 'object') {
            const img = inputsValue.img;

            const fileType = img.type.split('/')[0];

            if (fileType !== 'image') {
                showErrorMsg('Помилка! Заборонений тип файлу!');
                return;
            }
        }


        if (!inputsValue.name.replace(/\s/g, '').length) {
            showErrorMsg('Помилка! Товар не може бути без назви!');
            return;
        }

        if (itemDetails.categoryId === null || !categories[inputsValue.categoryId]) {
            showErrorMsg('Помилка! Виберіть категорію!');
            return;
        }

        for (let key in inputsValue) {
            if (inputsValue[key] === '') {
                showErrorMsg('Помилка! Заповнено не всі поля');
                return;
            }
        }

        if (nameCount > 27) {
            showErrorMsg(`Помилка! Ім'я не повинно перевищувати 27 символів`);
            return;
        }

        if (inputsValue.price > 2147483647) {
            showErrorMsg(`Помилка! Невірно вказана ціна`);
            return;
        }

        const product = {
            ...inputsValue
        }

        closeModal();
        handleSubmit(product);
    }

    const onCancelHandle = () => {
        closeModal();
        clearForm();
    }

    const clearForm = () => {
        setInputsValue({
            ...itemDetails
        });

        setNameCount(itemDetails.name.length);
        setItemCatId(itemDetails.categoryId);
        setError(false);
    }

    const selectFile = (e) => {
        setInputsValue({
            ...inputsValue,
            img: e.target.files[0]
        });
    }

    const showErrorMsg = (text) => {
        setError(text);
    }

    const changeCategory = (value) => {
        setItemCatId(value);
        setInputsValue({ ...inputsValue, categoryId: value })
    }

    const categoriesDropdown = categories && categories.map((cat, index) => {
        const activeCat = itemCatId === index ? true : false;

        return (
            <Dropdown.Item
                onClick={() => changeCategory(index)}
                key={cat.id}
                active={activeCat}
            >
                {cat.name}
            </Dropdown.Item>
        )
    })

    return (
        <>
            <div className="editBtn" onClick={onShow}>
                <PencilSquare />
            </div>

            <Modal size="lg" animation={true} show={modalVisible} onHide={onCancelHandle}>
                <Modal.Header closeButton>
                    <Modal.Title>Редагувати товар</Modal.Title>
                </Modal.Header>

                {error && <Alert className="m-2" variant={'danger'}>
                    {error}
                </Alert>}

                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>
                                    <b>Назва: <span
                                        className={nameCount > 27 ? 'text-danger' : ''}>
                                        ({nameCount})</span>
                                    </b>
                                </Form.Label>
                                <Form.Control
                                    onChange={e => updateState('name', e.target.value)}
                                    type="text"
                                    placeholder="Enter the product name"
                                    value={inputsValue && inputsValue.name}
                                />
                            </Form.Group>

                            <div className="item-details__image mt-2">
                                <img src={`${process.env.REACT_APP_API_URL}products/${itemDetails.img}`} alt="item pictures" />
                            </div>

                            <Form.Group as={Col} controlId="formGridImage" className="mt-4">
                                <Form.Control
                                    onChange={selectFile}
                                    type="file"
                                    placeholder="Enter the image url"
                                />
                            </Form.Group>

                            <Dropdown className="mt-4">
                                <Dropdown.Toggle>
                                    {!categories || !categories[itemCatId] ? 'Виберіть категорію' : categories[itemCatId].name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {categoriesDropdown}
                                </Dropdown.Menu>
                            </Dropdown>

                        </Form.Row>

                        <Form.Group controlId="formGridDesc" className="mt-4">
                            <Form.Label> <b> Опис: </b> </Form.Label>

                            <TextEditor onChangeInfo={updateState} fieldName={'description'} content={inputsValue.description} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} className="mt-4" controlId="formGridCount">
                                <Form.Label> <b> Ціна </b></Form.Label>
                                <Form.Control
                                    onChange={e => updateState('price', e.target.value)}
                                    value={inputsValue.price}
                                    placeholder="Ціна"
                                    type="number"
                                />
                            </Form.Group>
                        </Form.Row>

                        <hr />

                        <Button variant="secondary" onClick={onCancelHandle}>
                            Відмінити
                        </Button>

                        <Button className="m-2" variant="primary" type="button" onClick={onHandleSubmit}>
                            Зберегти
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminProductsEdit

