const _baseImgUrl = process.env.NODE_ENV === 'production' ?
    '/img/' : `${process.env.REACT_APP_API_URL}img/`;

export const Routes = {
    LOGIN_ROUTE: '/login',
    REGISTRATION_ROUTE: '/registration',
    HOME_ROUTE: '/',
    ABOUT_ROUTE: '/about-us',
    CONTACTS_ROUTE: '/contacts',
    PAYMENT_DELIVERY_ROUTE: '/payment-delivery',
    CART_ROUTE: '/cart',
    SHOP_ROUTE: '/shop',
    SHOP_ITEM_ROUTE: '/shop/:id',
    USERS_LIST: '/users-list',
    ORDERS_LIST: '/orders-list',
    USER_PROFILE: '/user-profile',
    USER_RESET_PASSWORD: '/reset-password/:id/:token',
}

export const UserRoles = {
    ADMIN: 'ADMIN',
    MODERATOR: 'MODERATOR',
    USER: 'USER',
}

export const ComponentName = {
    HOME: 'home',
    FOOTER: 'footer',
    ABOUT_US: 'about_us',
    PAYMENT: 'payment_delivery',
    CONTACTS: 'contacts',
}

export const UserDefault = {
    IMAGE: 'default_avatar.jpg'
}

export const ProductDefault = {
    IMAGE: 'deleted.png'
}

export const ImgUrlDefault = {
    ADVANTAGES: `${_baseImgUrl}advantages/`,
    COMPONENTS: `${_baseImgUrl}components/`,
    PRODUCTS: `${_baseImgUrl}products/`,
    USERS: `${_baseImgUrl}users/`,
}

