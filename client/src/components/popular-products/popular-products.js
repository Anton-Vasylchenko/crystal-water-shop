import React from 'react';
import Container from '../UI/container';
import Spinner from '../UI/spinner';
import ShopItem from '../shop-item';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularGoods, addItemToCart } from '../../redux/actions';

import './popular-products.scss';

const PopularProducts = ({ title, catId }) => {
    const dispatch = useDispatch();

    const cartItems = useSelector(({ cart }) => cart.items);
    const { isLoaded, popularItems } = useSelector(({ goods }) => goods);

    React.useEffect(() => {
        dispatch(fetchPopularGoods(catId));
    }, [dispatch, catId]);

    const handleAddItemToCart = (obj) => {
        dispatch(addItemToCart(obj));
    }

    const items = popularItems && popularItems.map(({ id, ...item }) => {
        const countOfAdded = cartItems[id] && cartItems[id].length;
        return <ShopItem
            key={id}
            onClickBuyBtn={handleAddItemToCart}
            countOfAdded={countOfAdded}
            id={id}
            {...item}
        />
    });

    return (
        <Container title={title} isLoaded={isLoaded}>
            <div className="popular-items-list">
                {!isLoaded ? <Spinner /> : items}
            </div>
        </Container>
    );
}

export default PopularProducts;
