import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../components/UI/container';
import CartItem from '../../components/cart-item';
import OrderForm from '../../components/order-form';
import ModalBox from '../../components/UI/modal-box';
import trashIcon from '../../assets/images/trash-icon.png';
import emptyCartImg from '../../assets/images/cart-is-empty.png';

import { clearCart, removeCartItem, minusCartItem, addItemToCart } from "../../redux/actions"

import './cart-page.scss';

export default function CartPage() {
    const dispatch = useDispatch();

    const { totalPrice,
        totalCount,
        items,
        itemTotalCount,
        itemTotalPrice
    } = useSelector(({ cart }) => cart);

    const [showPopup, setShowPopup] = React.useState(false)

    const onToggleClearCartPopup = () => {
        setShowPopup(prevState => !prevState);
    }

    const delItemFromCart = (id) => {
        dispatch(removeCartItem(id));
    }

    const plusItemCart = (item) => {
        dispatch(addItemToCart(item));
    }

    const minusItemCart = (id) => {
        itemTotalCount[id] > 1 && dispatch(minusCartItem(id));
    }

    const handleClickedYes = () => {
        dispatch(clearCart());
        setShowPopup(!showPopup);
    }

    const cartItems = Object.keys(items).map(key => {
        return items[key][0];
    });

    const cartItemsList = cartItems.map((elem) => {
        const id = elem.id;
        return <CartItem
            key={id}
            item={elem}
            count={itemTotalCount[id]}
            totalPrice={itemTotalPrice[id]}
            onDeleteItem={delItemFromCart}
            onMinus={minusItemCart}
            onPlus={plusItemCart}
        />
    })

    return (
        <Container title="Кошик" backArrow>
            {totalCount ?
                <CartView
                    items={cartItemsList}
                    onToggleClearCartPopup={onToggleClearCartPopup}
                    onClickYes={handleClickedYes}
                    totalCount={totalCount}
                    totalPrice={totalPrice}
                    showPopup={showPopup}
                />
                :
                <h3 className="text-center text-secondary jumbotron jumbotron-fluid">
                    <img className="empty-cart-img" src={emptyCartImg} alt="cart is empty" />
                    <p>Ваш кошик порожній :( </p>
                </h3>}
        </Container>
    )
}

const CartView = (props) => {
    const { items,
        showPopup,
        onToggleClearCartPopup,
        onClickYes,
        totalCount,
        totalPrice
    } = props;

    return (
        <React.Fragment>
            <ModalBox
                handleNo={onToggleClearCartPopup}
                handleYes={onClickYes}
                show={showPopup}
                title={'Кошик'}
                body={'Ви дійсно бажаєте очистити кошик?'}
            />

            <div className="cart-top">
                <div onClick={onToggleClearCartPopup} className="cart-top__clear-btn unselectable-text">
                    <img src={trashIcon} alt="trash-icon" />
                    Очистити кошик
                </div>
            </div>

            <ul>{items}</ul>

            <div className="cart-bottom">
                <div className="cart-bottom__info">
                    <div className="cart-bottom__items-counts">Всього товарів: <span>{totalCount} шт.</span></div>
                    <div className="cart-bottom__total-price">Сума замовлення: <span>{totalPrice} ₴</span></div>
                </div>

                <OrderForm />
            </div>
        </React.Fragment>
    )
}