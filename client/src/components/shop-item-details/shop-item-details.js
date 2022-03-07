import React, { useEffect } from 'react';
import Container from '../UI/container';
import Spinner from '../UI/spinner';
import PopularProducts from '../popular-products';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemDetails, addItemToCart } from '../../redux/actions';
import { AdminProductsEdit } from '../admin/admin-products';
import useIsAdmin from '../../hooks/useIsAdmin';
import useIsModerator from '../../hooks/useIsModerator';
import parse from 'html-react-parser';
import { ImgUrlDefault } from '../../utils/consts';

import './shop-item-details.scss';

function ShopItemDetails({ itemId }) {
    const dispatch = useDispatch();
    const { itemDetails, isLoaded } = useSelector(({ goods }) => goods);

    const cartItems = useSelector(({ cart }) => cart.items);
    const countOfAdded = cartItems[itemId] && cartItems[itemId].length;

    const isAdmin = useIsAdmin();
    const isModerator = useIsModerator();

    const handleAddItemToCart = () => {
        dispatch(addItemToCart(itemDetails));
    }

    useEffect(() => {
        dispatch(fetchItemDetails(itemId));
    }, [itemId, dispatch])

    if (!itemDetails || Object.keys(itemDetails).length === 0) {
        return <Spinner />;
    }

    const editAccess = isAdmin || isModerator;

    return (
        <React.Fragment>
            <Container title={itemDetails.name} backArrow>
                {editAccess && itemDetails
                    ? <AdminProductsEdit itemDetails={itemDetails} /> : ''}

                {!isLoaded ? <Spinner /> :
                    <div className="shop-item-details">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="shop-item-details__image">
                                    <img src={`${ImgUrlDefault.PRODUCTS}${itemDetails.img}`} alt="item pictures" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="shop-item-details__block shop-item-details__info">
                                    <p className="desc-title">Опис:</p>
                                    <span>
                                        {parse(`${itemDetails.description}`)}
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div className="shop-item-details__bottom">
                            <div className="shop-item-details__price">
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


export default ShopItemDetails
