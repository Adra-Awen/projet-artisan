const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const entreprise = sequelize.define('Entreprise', {
        id_entreprise: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        note: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        ville: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        web: {
            type: DataTypes.STRING,
            allowNull: true
        },
        top_entreprise: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        seo_title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        seo_description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_specialite: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        tableName: 'entreprise',
        timestamps: false
    });

return entreprise;
};