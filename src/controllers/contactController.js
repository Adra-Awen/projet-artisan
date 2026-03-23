const { contact } = require('../models/index');

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await contact.findAll();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des contacts.' });
    }
};