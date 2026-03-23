const { entreprise } = require('../models/index');

exports.getAllEntreprises = async (req, res) => {
    try {
        const entreprises = await entreprise.findAll();
        res.status(200).json(entreprises);
    } catch (error) {
        console.error('Erreur lors de la récupération des entreprises :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des entreprises.' });
    }
};