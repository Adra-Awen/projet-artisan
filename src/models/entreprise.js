const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const entreprise = sequelize.define('Entreprise', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'entreprises',
        timestamps: false
    });

return entreprise;
};