// const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Speciality = sequelize.define('Speciality', {
        id_specialite: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        id_categorie: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'specialite',
        freezeTableName: true,
        timestamps: false
    });

    return Speciality;
};
