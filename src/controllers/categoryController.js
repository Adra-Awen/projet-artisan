const { category } = require('../models/index');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await category.findAll();
        res.render('categories', {
            title: 'Bâtiment',
            categories: categories
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories.' });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundCategory = await category.findByPk(id);
        if (!foundCategory) {
            return res.status(404).json({ error: 'Catégorie non trouvée.' });
        }
        res.render('category-details', {
            title: foundCategory.nom,
            category: foundCategory
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de la catégorie :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la catégorie.' });
    }
};