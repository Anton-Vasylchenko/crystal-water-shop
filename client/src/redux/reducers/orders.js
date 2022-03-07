const initialState = {
    items: [],
    pageOrders: 1,
    totalCount: 0,
    limit: 10,
    isLoaded: false,
    isLoadedOrderItems: false,
}

// {
//     id: 2,
//     orderNumber: '444 555 888',
//     totalAmount: '13002',
//     date: '15/25/21',
//     goods: [{
//         id: 22,
//         name: 'Water 1',
//         img: 'b221a67f-0662-4d64-a123-ea3223948eab.jpeg',
//         price: 150
//     },
//     {
//         id: 23,
//         name: 'Water 2',
//         img: 'b221a67f-0662-4d64-a123-ea3223948eab.jpeg',
//         price: 150
//     }]
// }

const orders = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            const itemsOrder = {};

            for (let i = 0; i < action.payload.length; i++) {

                if (!itemsOrder[action.payload[i].orderNumber]) {
                    itemsOrder[action.payload[i].orderNumber] = [];
                }

                itemsOrder[action.payload[i].orderNumber].push(action.payload[i]);
            }

            const stateOrders = [];

            for (let key in itemsOrder) {
                const order = {};
                order.orderNumber = itemsOrder[key][0].orderNumber;
                order.userName = itemsOrder[key][0].userName;
                order.userEmail = itemsOrder[key][0].userEmail;
                order.userPhone = itemsOrder[key][0].userPhone;
                order.id = itemsOrder[key][0].id;
                order.totalAmount = itemsOrder[key][0].amount;
                order.date = itemsOrder[key][0].createdAt;
                order.goods = [];

                stateOrders.push(order);
            }

            return {
                ...state,
                items: [...stateOrders],
                isLoaded: true
            };

        case 'SET_ORDERS_ITEMS':
            const orderId = action.payload[0].orderNumber;
            let newStateItems;

            for (let i = 0; i < state.items.length; i++) {

                newStateItems = [
                    ...state.items
                ]

                if (state.items[i].orderNumber === orderId) {
                    newStateItems[i].goods = [...action.payload];
                } else {
                    newStateItems[i].goods = [...state.items[i].goods];
                }
            }

            return {
                ...state,
                items: newStateItems ? [...newStateItems] : [],
                isLoaded: true
            };

        case 'SET_ORDERS_LOADED':
            return {
                ...state,
                isLoaded: action.payload
            };
        case 'SET_ORDERS_ITEMS_LOADED':
            return {
                ...state,
                isLoadedOrderItems: action.payload
            };
        case 'SET_ORDERS_PAGE':
            return {
                ...state,
                pageOrders: action.payload,
            };
        case 'SET_LIMIT':
            return {
                ...state,
                limit: action.payload,
            };
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                totalCount: action.payload,
            };
        default:
            return state;
    }
};


export default orders;