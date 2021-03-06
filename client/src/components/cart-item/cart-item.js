import React from 'react'
import { Link } from 'react-router-dom';

import './cart-item.scss';
import ModalBox from '../UI/modal-box';
import { ImgUrlDefault } from '../../utils/consts';

const CartItem = (props) => {
    const { item, count, totalPrice, onDeleteItem, onPlus, onMinus } = props;
    const { id, img, name } = item;

    const [showPopup, setShowPopup] = React.useState(false);

    const onClosePopupHandler = () => {
        setShowPopup(!showPopup);
    }

    const handlePlusClick = () => {
        onPlus(item)
    }

    const handleMinusClick = () => {
        onMinus(id)
    }

    const onClickYesPopupHandler = () => {
        onDeleteItem(id)
        setShowPopup(!showPopup);
    }

    return (
        <li className="cart-item ">

            <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="cart-item__img">
                        <img src={`${ImgUrlDefault.PRODUCTS}${img}`} alt="item" />
                    </div>
                    <div className="cart-item__info">
                        <Link to={`/shop/${id}`}><h3>{name}</h3></Link>
                    </div>
                </div>
                <div className="col-md-6 d-flex bottom-item-mobile align-items-center">
                    <div className="cart-item__count">
                        <div onClick={handleMinusClick} className="cart-item__btn unselectable-text">-</div>
                        <span>{count}</span>
                        <div onClick={handlePlusClick} className="cart-item__btn unselectable-text">+</div>
                    </div>
                    <div className="cart-item__price">{totalPrice} ₴</div>
                    <div className="cart-item__del">
                        <div className="cart-item__btn btn_del unselectable-text" onClick={onClosePopupHandler}>x</div>
                    </div>
                </div>
            </div>

            <ModalBox
                show={showPopup}
                handleNo={onClosePopupHandler}
                handleYes={onClickYesPopupHandler}
                title={`Видалення: "${name}"`}
                body={`Ви дійсно бажаєте видалити з кошика "${name}"?`}
            />
        </li>
    )
}

export default CartItem;
