const { category, entreprise, speciality } = require('../models/index');

exports.getAllCategories = async (req, res) => {
    try {
        const list = await category.findAll();
        res.render('category', {
            title: 'Toutes les catégories',
            categories: list,
            category : {nom: 'Toutes les catégories'},
            entreprises: []
            });
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories.' });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await category.findByPk(id, {
                include: [{model: speciality, include: [{model: entreprise}]}]
        });
        if (!result) {
            return res.status(404).json({ error: 'Catégorie non trouvée.' });
        }

        let listeEntreprises = [];

        const specs = result.Specialities || result.specialities || [];
        
        specs.forEach(spec => {
            const ents = spec.Entreprises || spec.entreprises || [];
            if (ents.length > 0) {
                listeEntreprises = listeEntreprises.concat(ents);
            }
        });

        res.render('category', {
            title: result.nom,
            category: result,
            entreprises: listeEntreprises
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de la catégorie :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la catégorie.' });
    }
};