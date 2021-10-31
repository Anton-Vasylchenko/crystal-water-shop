import React, { useEffect } from 'react';
import { Container, Spinner, PopularProducts } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemDetails, addItemToCart } from '../../redux/actions';
import { AdminProductsEdit } from '../admin/admin-products';
import parse from 'html-react-parser';

import './item-details.scss';

function ItemDetails({ itemId }) {
    const dispatch = useDispatch();
    const { itemDetails, isLoaded } = useSelector(({ goods }) => goods);
    const { isAuth } = useSelector(({ user }) => user);

    const cartItems = useSelector(({ cart }) => cart.items);
    const countOfAdded = cartItems[itemId] && cartItems[itemId].length;

    useEffect(() => {
        dispatch(fetchItemDetails(itemId));
    }, [dispatch, itemId])

    const handleAddItemToCart = () => {
        dispatch(addItemToCart(itemDetails));
    }

    return (
        <ItemDetailsView
            isLoaded={isLoaded}
            handleAddItemToCart={handleAddItemToCart}
            countOfAdded={countOfAdded}
            itemDetails={itemDetails}
            isAdmin={isAuth}
        />
    )
}

const ItemDetailsView = ({ isLoaded, handleAddItemToCart, countOfAdded, itemDetails, isAdmin }) => {
    return (
        <React.Fragment>
            <Container title={itemDetails.name} backArrow>

                {isAdmin && Object.keys(itemDetails).length
                    ? <AdminProductsEdit itemDetails={itemDetails} /> : ''}

                {!isLoaded ? <Spinner /> :
                    <div className="item-details">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="item-details__image">
                                    {itemDetails.img &&
                                        <img src={`${process.env.REACT_APP_API_URL}products/${itemDetails.img}`} alt="item pictures" />}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="item-details__block item-details__info">
                                    <p className="desc-title">Опис:</p>
                                    <span>
                                        {parse(`${itemDetails.description}`)}
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div className="item-details__bottom">
                            <div className="item-details__price">
                                Ціна: {itemDetails.price} ₴
                            </div>
                            <button onClick={handleAddItemToCart} className="btn-add-to-cart">
                                +Додати {countOfAdded && <span>{countOfAdded}</span>}
                            </button>
                        </div>


                    </div>
                }
            </Container>

            <PopularProducts title={"Популярне у даній категорії"} catId={itemDetails.categoryId} />
        </React.Fragment>
    )
}

export default ItemDetails
