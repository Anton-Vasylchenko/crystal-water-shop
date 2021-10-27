import React from 'react';
import { Modal, Button, Col, Form, Dropdown, Alert, } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import TextEditor from '../text-editor';
import { setActiveCategory } from '../../../redux/actions';

function EditProduct({ show, handleNo, handleSubmit, currentCategory, categoriesList, itemDetails }) {
    const dispatch = useDispatch();

    // const { itemDetails, isLoaded } = useSelector(({ goods }) => goods);

    const [error, setError] = React.useState(false);
    const [nameCount, setNameCount] = React.useState(itemDetails.name.length);
    const [itemCatId, setItemCatId] = React.useState(currentCategory);

    const [inputsValue, setInputsValue] = React.useState({
        ...itemDetails
    });

    React.useEffect(() => {
        setInputsValue({ ...itemDetails })
    }, [])

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

        if (currentCategory === null) {
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

        handleNo();
        handleSubmit(product);
    }

    const onCancelHandle = () => {
        handleNo();
        clearForm();
    }

    const clearForm = () => {
        setInputsValue({
            ...itemDetails
        });

        setNameCount(itemDetails.name.length);
        setItemCatId(currentCategory);
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

    const categoriesDropdown = categoriesList && categoriesList.map((cat, index) => {

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

    // const isExistCategory = !categoriesList[itemCatId].name ? 'Виберіть категорію' : categoriesList[itemCatId].name    

    return (
        <>
            <Modal size="lg" animation={true} show={show} onHide={onCancelHandle}>
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
                                    {!categoriesList || !itemCatId ? 'Виберіть категорію' : categoriesList[itemCatId].name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {categoriesDropdown}
                                </Dropdown.Menu>
                            </Dropdown>

                        </Form.Row>

                        <Form.Group controlId="formGridDesc" className="mt-4">
                            <Form.Label> <b> Опис: </b> </Form.Label>

                            <TextEditor onChangeInfo={updateState} content={inputsValue.description} />
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

export default EditProduct;



// import React from 'react';
// import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import TextEditor from '../text-editor';

// function CreateProduct({ show, onHide, item }) {
//     const { activeCategory, categories } = useSelector(({ filters }) => filters);

//     const [inputsValue, setInputsValue] = React.useState(item ? { ...item }
//         : {
//             name: '',
//             price: '',
//             img: '',
//             description: '',
//         });

//     const categoriesDropdown = categories && categories.map((cat, index) => {
//         const activeCat = activeCategory === index ? true : false;
//         return (<Dropdown.Item key={cat.id} active={activeCat}>
//             {cat.name}
//         </Dropdown.Item>)
//     })

//     const updateState = () => {

//     }

//     return (
//         <div onClick={e => e.stopPropagation()}>
//             <Modal
//                 show={show}
//                 onHide={onHide}
//                 size="lg"
//                 centered
//             >
//                 <Modal.Header>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         Додати новий продукт
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Dropdown>
//                             <Dropdown.Toggle>
//                                 Виберіть категорію
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                                 {categoriesDropdown}
//                             </Dropdown.Menu>
//                         </Dropdown>

//                         <Form.Control
//                             className="mt-4"
//                             placeholder="Назва"
//                         />

//                         <Form.Control
//                             className="mt-4"
//                             placeholder="Ціна"
//                             type="number"
//                         />

//                         <Form.Control
//                             className="mt-4"
//                             placeholder="Опис"
//                             type="text"
//                         />

//                         <Form.Control
//                             className="mt-4"
//                             placeholder="Зображення"
//                             type="file"
//                         />

//                         <TextEditor onChangeInfo={updateState} content={inputsValue.info} />

//                         <hr />
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
//                     <Button variant="outline-success" onClick={onHide}>Додати</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// }

// export default CreateProduct

