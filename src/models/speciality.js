const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Speciality = sequelize.define('Speciality', {
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
        tableName: 'specialities',
        timestamps: false
    });

    return Speciality;
};
