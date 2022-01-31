import { setCategories, setActiveCategory, setSortBy, fetchCategories, setSortOrder } from './filters';
import { setGoods, fetchGoods, setLoaded, fetchPopularGoods, fetchItemDetails, setPage, setLimit, setTotalCount } from './goods';
import { setAdvantages, fetchAdvantages } from './advantages';
import { addItemToCart, clearCart, removeCartItem, plusCartItem, minusCartItem } from './cart';
import { setIsAuth, setUser, setUserLogout } from './user';
import { setOrders, fetchOrders, setOrdersLoaded, setOrdersPage, setOrdersLimit, setOrdersTotalCount } from './orders';

export {
    setGoods,
    setCategories,
    setSortBy,
    setActiveCategory,
    setAdvantages,
    fetchGoods,
    fetchAdvantages,
    fetchCategories,
    setLoaded,
    setSortOrder,
    addItemToCart,
    clearCart,
    removeCartItem,
    plusCartItem,
    minusCartItem,
    fetchPopularGoods,
    fetchItemDetails,
    setIsAuth,
    setUser,
    setPage,
    setLimit,
    setTotalCount,
    setUserLogout,
    setOrders, fetchOrders, setOrdersLoaded, setOrdersPage, setOrdersLimit, setOrdersTotalCount
}