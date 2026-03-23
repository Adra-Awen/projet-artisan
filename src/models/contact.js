const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        id_contact: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom_expediteur: DataTypes.STRING,
        prenom_expediteur: DataTypes.STRING,
        email_expediteur: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code_postal: DataTypes.STRING,
        object: DataTypes.STRING,
        message: DataTypes.TEXT,
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        id_entreprise: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'contact',
        freezeTableName: true,
        timestamps: true
    });
    return Contact;
};