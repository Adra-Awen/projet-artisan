const { category } = require('../models/index');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories.' });
    }
};