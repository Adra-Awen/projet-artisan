const { speciality } = require('../models/index');

exports.getAllSpecialities = async (req, res) => {
    try {
        const specialities = await speciality.findAll();
        res.status(200).json(specialities);
    } catch (error) {
        console.error('Erreur lors de la récupération des spécialités :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des spécialités.' });
    }
};