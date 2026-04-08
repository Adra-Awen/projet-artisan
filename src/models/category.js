const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
        id_categorie: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'categorie',
        freezeTableName: true,
        timestamps: false
    });

    return category;
};
