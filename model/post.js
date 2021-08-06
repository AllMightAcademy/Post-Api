const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Post = sequelize.define("post", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING(200),
    },
    content: {
        type: DataTypes.STRING(1200),
        allowNull: false
    }
}, {
    tableName: 'posts',
    freezeTableName: true
});

module.exports = Post;