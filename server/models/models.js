// const sequelize = require('../db')
// const { DataTypes } = require('sequelize')

// const User = sequelize.define('user', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     email: { type: DataTypes.STRING, unique: true },
//     password: { type: DataTypes.STRING },
//     role: { type: DataTypes.STRING, defaultValue: "USER" },
// });

// const Product = sequelize.define('product', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, unique: false, allowNull: false },
//     price: { type: DataTypes.INTEGER, allowNull: false },
//     description: { type: DataTypes.TEXT, allowNull: false },
//     img: { type: DataTypes.STRING, allowNull: false },
//     rating: { type: DataTypes.INTEGER, defaultValue: 0 },    
// });

// const Category = sequelize.define('category', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, unique: true, allowNull: false },
// });

// const Component = sequelize.define('component', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title: { type: DataTypes.STRING, unique: true, allowNull: false },
//     text: { type: DataTypes.TEXT, allowNull: true },
//     img: { type: DataTypes.STRING, allowNull: false },
// });

// const Advantages = sequelize.define('advantages', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title: { type: DataTypes.STRING, unique: true, allowNull: false },
//     img: { type: DataTypes.STRING, allowNull: false },
// });

// Category.hasMany(Product);
// Product.belongsTo(Category);

// module.exports = {
//     User, Advantages, Product, Component, Category
// }
const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, defaultValue: null },
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING, defaultValue: "default_avatar.jpg" },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    categoryId: { type: DataTypes.INTEGER, defaultValue: null },
});

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: true },
});

const Component = sequelize.define('component', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    componentName: { type: DataTypes.STRING, unique: false, allowNull: false },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: false }
});

const Advantages = sequelize.define('advantages', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

const OrdersItems = sequelize.define('orders_items', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, unique: false, allowNull: false },
    goodsId: { type: DataTypes.STRING, unique: false, allowNull: false },
    orderNumber: { type: DataTypes.STRING, unique: false, allowNull: false },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    img: { type: DataTypes.STRING, unique: false, allowNull: false },
    price: { type: DataTypes.STRING, unique: false, allowNull: false },
    count: { type: DataTypes.STRING, unique: false, allowNull: false },
});

const OrdersList = sequelize.define('orders_list', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, unique: false, allowNull: false },
    orderNumber: { type: DataTypes.STRING, unique: false, allowNull: false },
    amount: { type: DataTypes.STRING, unique: false, allowNull: false },
    userName: { type: DataTypes.STRING, unique: false, allowNull: true },
    userPhone: { type: DataTypes.STRING, unique: false, allowNull: true },
    userEmail: { type: DataTypes.STRING, unique: false, allowNull: true }
});

const ProductsRating = sequelize.define('products_rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, unique: false, allowNull: false },
    rating: { type: DataTypes.STRING, unique: false, allowNull: false },
});

module.exports = {
    User, Advantages, Product, Component, Category, OrdersItems, OrdersList, ProductsRating
}