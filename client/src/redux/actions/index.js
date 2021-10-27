import { setCategories, setActiveCategory, setSortBy, fetchCategories, setSortOrder } from './filters';
import { setGoods, fetchGoods, setLoaded, fetchPopularGoods, fetchItemDetails } from './goods';
import { setAdvantages, fetchAdvantages } from './advantages';
import { addItemToCart, clearCart, removeCartItem, plusCartItem, minusCartItem } from './cart';
import { setIsAuth, setUser } from './user';

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
    setUser
}