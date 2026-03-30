const { category, entreprise, speciality } = require('../models/index');

exports.getAllCategories = async () => {
    try {
        const categories = await category.findAll({
            order: [['nom', 'ASC']]
        });
        return categories;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        throw error;
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        let result;
        const queryOptions = {
                include: [{
                    model: speciality,
                    as: 'speciality', 
                    include: [{
                        model: entreprise,
                        as: 'entreprise',
                    }]
                }]
            };
        if (!isNaN(id)) {
            result = await category.findByPk(id, queryOptions);
        } else {
            result = await category.findOne({
                where: { nom: id },
                ...queryOptions
            });
        }

        if (!result) {
            return res.status(404).json({ error: 'Catégorie non trouvée.' });
        }

        let listeEntreprises = [];

        const specs = result.speciality || [];        

        specs.forEach(spec => {
            const ents = spec.entreprise || [];
            const entsArray = Array.isArray(ents) ? ents : [ents];

            entsArray.forEach(ent => {
                ent.specialiteNom = spec.nom;
                listeEntreprises.push(ent);
            });
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
