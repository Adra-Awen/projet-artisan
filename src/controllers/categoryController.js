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

/*liste de tous les artisants d'une catégorie*/
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

        /*injection de la specialité pour chaque entreprise*/
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
            metaDescription: `Découvrez les meilleurs artisans spécialisés en ${result.nom} dans la région Auvergne-Rhône-Alpes. Trouvez facilement des professionnels qualifiés pour tous vos projets de rénovation, construction et décoration liés à ${result.nom}.`,
            metaKeywords: `artisans ${result.nom}, annuaire ${result.nom}, Auvergne-Rhône-Alpes, services ${result.nom}, professionnels qualifiés ${result.nom}`,
            category: result,
            entreprises: listeEntreprises
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de la catégorie :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la catégorie.' });
    }
};

// liste les artisans d'une catégorie via les slugs
exports.getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
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
        if (!isNaN(slug)) {
            result = await category.findByPk(id, queryOptions);
        } else {
            result = await category.findOne({
                where: { slug: slug },
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
            metaDescription: `Découvrez les meilleurs artisans spécialisés en ${result.nom} dans la région Auvergne-Rhône-Alpes. Trouvez facilement des professionnels qualifiés pour tous vos projets de rénovation, construction et décoration liés à ${result.nom}.`,
            metaKeywords: `artisans ${result.nom}, annuaire ${result.nom}, Auvergne-Rhône-Alpes, services ${result.nom}, professionnels qualifiés ${result.nom}`,
            category: result,
            entreprises: listeEntreprises
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de la catégorie :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la catégorie.' });
    }
};