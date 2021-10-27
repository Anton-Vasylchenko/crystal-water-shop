import React from 'react'
import { ShopItem, Spinner } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoods, addItemToCart } from '../../redux/actions';
import { AdminProductsAdd } from '../admin/admin-products';

import './shop-items-list.scss';

function ShopItemsList() {
    const dispatch = useDispatch();

    const cartItems = useSelector(({ cart }) => cart.items);
    const { items, isLoaded } = useSelector(({ goods }) => goods);
    const { activeCategory, sortBy, sortOrder } = useSelector(({ filters }) => filters);
    const { isAuth } = useSelector(({ user }) => user);

    React.useEffect(() => {
        dispatch(fetchGoods(sortBy, activeCategory, sortOrder));
    }, [dispatch, activeCategory, sortBy, sortOrder]);

    const handleAddItemToCart = (obj) => {
        dispatch(addItemToCart(obj));
    }

    const loadingGoods = !isLoaded ? <Spinner /> : items.map((item) => {
        const countOfAdded = cartItems[item.id] && cartItems[item.id].length;
        return <ShopItem
            onClickBuyBtn={handleAddItemToCart}
            key={item.id}
            countOfAdded={countOfAdded}
            adminAuth={isAuth}
            {...item}
        />
    })

    const goodsList = loadingGoods.length !== 0
        ? loadingGoods
        : <h3 className="text-center text-secondary jumbotron jumbotron-fluid">
            Товари відсутні :(
        </h3>;

    return (
        <div className="shop-items-list">
            {isAuth ? <AdminProductsAdd /> : ''}
            {goodsList}
        </div>
    )
}

export default ShopItemsList;
