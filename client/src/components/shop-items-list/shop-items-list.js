import React from 'react'
import ListItem from './list-item';
import Spinner from '../UI/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoods, addItemToCart, setPage } from '../../redux/actions';
import { AdminProductsAdd } from '../admin/admin-products';
import useIsAdmin from '../../hooks/useIsAdmin';
import useIsModerator from '../../hooks/useIsModerator';
import Pagination from '../UI/pagination';

import './shop-items-list.scss';

function ShopItemsList() {
    const dispatch = useDispatch();

    const cartItems = useSelector(({ cart }) => cart.items);
    const { items, isLoaded, totalCount, limit, page } = useSelector(({ goods }) => goods);
    const { activeCategory, sortBy, sortOrder } = useSelector(({ filters }) => filters);

    const isAdmin = useIsAdmin();
    const isModerator = useIsModerator();

    React.useEffect(() => {
        dispatch(fetchGoods(sortBy, activeCategory, sortOrder, page, limit));
    }, [activeCategory, sortBy, sortOrder, page, limit]);

    const handleAddItemToCart = (obj) => {
        dispatch(addItemToCart(obj));
    }

    const handleChangePage = (pageNumber) => {
        dispatch(setPage(pageNumber));
    }

    const loadingGoods = !isLoaded ? <Spinner /> : items.map((item) => {
        const countOfAdded = cartItems[item.id] && cartItems[item.id].length;
        return <ListItem
            onClickBuyBtn={handleAddItemToCart}
            key={item.id}
            countOfAdded={countOfAdded}
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
            {isAdmin || isModerator ? <AdminProductsAdd /> : ''}
            {goodsList}

            <Pagination
                className="pagination-bar"
                currentPage={page}
                totalCount={totalCount}
                pageSize={limit}
                onPageChange={page => handleChangePage(page)}
            />
        </div>
    )
}

export default ShopItemsList;
