const sequelize = require('../config/database');
const category = require('./category')(sequelize);
const speciality = require('./speciality')(sequelize);
const entreprise = require('./entreprise')(sequelize);
const contact = require('./contact')(sequelize);

// RELATIONS //

category.hasMany(speciality, { foreignKey: 'categoryId' });
speciality.belongsTo(category, { foreignKey: 'categoryId' });

speciality.hasMany(entreprise, { foreignKey: 'specialityId' });
entreprise.belongsTo(speciality, { foreignKey: 'specialityId' });

entreprise.hasOne(contact, { foreignKey: 'entrepriseId' });
contact.belongsTo(entreprise, { foreignKey: 'entrepriseId' });

module.exports = {
    sequelize,
    category,
    speciality,
    entreprise,
    contact
};