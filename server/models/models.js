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
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Advantages = sequelize.define('advantages', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
    User, Advantages, Product, Component, Category
}