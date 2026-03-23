const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const category = require('./category')(sequelize, DataTypes);
const speciality = require('./speciality')(sequelize, DataTypes);
const entreprise = require('./entreprise')(sequelize, DataTypes);
const contact = require('./contact')(sequelize, DataTypes);

// RELATIONS //

category.hasMany(speciality, { foreignKey: 'id_categorie' });
speciality.belongsTo(category, { foreignKey: 'id_categorie' });

speciality.hasMany(entreprise, { foreignKey: 'id_specialite' });
entreprise.belongsTo(speciality, { foreignKey: 'id_specialite' });

entreprise.hasOne(contact, { foreignKey: 'id_entreprise' });
contact.belongsTo(entreprise, { foreignKey: 'id_entreprise' });

module.exports = {
    sequelize,
    category,
    speciality,
    entreprise,
    contact
};