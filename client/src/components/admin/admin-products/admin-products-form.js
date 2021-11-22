import React from 'react';
import { Modal, Button, Col, Form, Dropdown, Alert, } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import TextEditor from '../text-editor';
import { setActiveCategory } from '../../../redux/actions';

function AdminProductsForm({ show, handleNo, handleSubmit }) {
    const dispatch = useDispatch();

    const { activeCategory, categories } = useSelector(({ filters }) => filters);

    const [error, setError] = React.useState(false);
    const [nameCount, setNameCount] = React.useState(0);
    const [selectedImage, setSelectedImage] = React.useState('');

    const [inputsValue, setInputsValue] = React.useState({
        name: '',
        img: '',
        price: '',
        description: ''
    });

    const updateState = (field, newValue) => {
        field === 'name' && setNameCount(newValue.length);

        setInputsValue({
            ...inputsValue,
            [field]: newValue
        });
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (activeCategory === null) {
            showErrorMsg('Помилка! Виберіть категорію!');
            return;
        }

        if (!inputsValue.price.trim().length === 0) {
            showErrorMsg('Помилка! Товар не може бути без назви!');
            return;
        }

        if (inputsValue.price.trim().length === 0) {
            showErrorMsg('Помилка! Не вказана ціна');
            return;
        }

        if (inputsValue.description.trim().length === 0) {
            showErrorMsg('Помилка! Не вказаний опис');
            return;
        }

        if (typeof inputsValue.img !== 'object') {
            showErrorMsg('Помилка! Ви не обрали зображення');
            return;
        }

        const img = inputsValue.img;
        const fileType = img.type.split('/')[0];

        if (fileType !== 'image') {
            showErrorMsg('Помилка! Заборонений тип файлу!');
            return;
        }

        if (nameCount > 40) {
            showErrorMsg(`Помилка! Ім'я не повинно перевищувати 40 символів`);
            return;
        }

        if (inputsValue.price > 2147483647) {
            showErrorMsg(`Помилка! Невірно вказана ціна`);
            return;
        }

        const product = {
            ...inputsValue
        }

        clearForm();

        handleNo();
        handleSubmit(product);
    }

    const onCancelHandle = () => {
        handleNo();
        setError(false);
    }

    const clearForm = () => {
        setInputsValue({
            name: '',
            img: '',
            price: '',
            description: ''
        });

        setSelectedImage('');

        setNameCount(0);
        setError(false);
    }

    const selectFile = (e) => {
        setSelectedImage(e.target.files[0]);
        setInputsValue({
            ...inputsValue,
            img: e.target.files[0]
        });

    }

    const showErrorMsg = (text) => {
        setError(text);
    }

    const changeCategory = (value) => {
        dispatch(setActiveCategory(value));
    }

    const categoriesDropdown = categories && categories.map((cat, index) => {
        const activeCat = activeCategory === index ? true : false;

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

    const imgUrl = selectedImage.length !== 0 && URL.createObjectURL(selectedImage);

    return (
        <>
            <Modal size="lg" animation={true} show={show} onHide={onCancelHandle}>
                <Modal.Header closeButton>
                    <Modal.Title>Створити новий товар</Modal.Title>
                </Modal.Header>

                {error && <Alert className="m-2" variant={'danger'}>
                    {error}
                </Alert>}

                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>
                                    <b>Name: <span
                                        className={nameCount > 40 ? 'text-danger' : ''}>
                                        ({nameCount})</span>
                                    </b>
                                </Form.Label>
                                <Form.Control
                                    onChange={e => updateState('name', e.target.value)}
                                    type="text"
                                    placeholder="Enter the product name"
                                    value={inputsValue.name}
                                />
                            </Form.Group>

                            <Dropdown className="mt-4">
                                <Dropdown.Toggle>
                                    {activeCategory === null ? 'Виберіть категорію' : categories[activeCategory].name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {categoriesDropdown}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Form.Group as={Col} controlId="formGridImage" className="mt-4">

                                {selectedImage.length !== 0 && <div className="item-details__image mt-2">
                                    <img src={imgUrl} alt="item pictures" />
                                </div>}

                                <Form.Control
                                    onChange={selectFile}
                                    type="file"
                                    placeholder="Enter the image url"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridDesc" className="mt-4">
                            <Form.Label> <b> Опис: </b> </Form.Label>

                            <TextEditor onChangeInfo={updateState} content={inputsValue.description} fieldName="description" />
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
                            Створити
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminProductsForm;