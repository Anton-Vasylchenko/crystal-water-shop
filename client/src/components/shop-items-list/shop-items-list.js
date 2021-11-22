import React from 'react'
import ShopItem from '../shop-item';
import Spinner from '../UI/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoods, addItemToCart, setPage } from '../../redux/actions';
import { AdminProductsAdd } from '../admin/admin-products';
import PagePagination from '../UI/page-pagination';
import Pagination from '../UI/pagination';
import { UserRoles } from '../../utils/consts';

import './shop-items-list.scss';

function ShopItemsList() {
    const dispatch = useDispatch();

    const cartItems = useSelector(({ cart }) => cart.items);
    const { items, isLoaded, totalCount, limit, page } = useSelector(({ goods }) => goods);
    const { activeCategory, sortBy, sortOrder } = useSelector(({ filters }) => filters);
    const { isAuth, role } = useSelector(({ user }) => user);

    React.useEffect(() => {
        dispatch(fetchGoods(sortBy, activeCategory, sortOrder, page, limit));
    }, [activeCategory, sortBy, sortOrder, page, limit]);

    const handleAddItemToCart = (obj) => {
        dispatch(addItemToCart(obj));
    }

    const handleChangePage = (pageNumber) => {
        dispatch(setPage(pageNumber));
    }

    const isAdmin = isAuth && role === UserRoles.ADMIN;
    const isModerator = isAuth && role === UserRoles.MODERATOR;

    const loadingGoods = !isLoaded ? <Spinner /> : items.map((item) => {
        const countOfAdded = cartItems[item.id] && cartItems[item.id].length;
        return <ShopItem
            onClickBuyBtn={handleAddItemToCart}
            key={item.id}
            countOfAdded={countOfAdded}
            isAdmin={isAdmin}
            isModerator={isModerator}
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
