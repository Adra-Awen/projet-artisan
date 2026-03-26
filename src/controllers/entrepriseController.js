const { entreprise, speciality } = require('../models/index');

exports.getAllEntreprises = async (req, res) => {
    try {
        const entreprises = await entreprise.findAll();
        res.status(200).json(entreprises);
    } catch (error) {
        console.error('Erreur lors de la récupération des entreprises :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des entreprises.' });
    }
};

exports.getEntrepriseById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await entreprise.findByPk(id, {
            include: [{model: speciality}]
        });

        if (!result) {
            return res.status(404).json({ error: 'Entreprise non trouvée.' });
        }

        res.render('entreprise', {
            title: result.nom,
            entreprise: result
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'entreprise :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'entreprise.' });
    }
};