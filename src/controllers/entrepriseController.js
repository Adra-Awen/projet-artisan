const { RelationshipType } = require('sequelize/lib/errors/database/foreign-key-constraint-error');
const { entreprise, speciality, contact, category, search } = require('../models/index');
/*importantion de Op pour les requetes de recherche*/
const { Op } = require('sequelize');

exports.getAllEntreprises = async (req, res) => {
    try {
        const entreprises = await entreprise.findAll();
        res.status(200).json(entreprises);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des entreprises.' });
    }
};

//Récupère une entreprise par son ID*
exports.getEntrepriseById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await entreprise.findByPk(id, {
            include: [{model: speciality, as: 'speciality', include: [{ model: category, as: 'category' }] }],
        });

        if (!result) {
            return res.status(404).json({ error: 'Entreprise non trouvée.' });
        }

        res.render('entreprise', {
            title: result.seo_title || result.nom,
            metaDescription: result.seo_description || `Découvrez ${result.nom}, un artisan spécialisé en ${result.speciality ? result.speciality.nom : 'artisanat'} dans la région Auvergne-Rhône-Alpes. Trouvez facilement des professionnels qualifiés pour tous vos projets de rénovation, construction et décoration liés à ${result.speciality ? result.speciality.nom : 'l\'artisanat'}.`,
            metaKeywords: result.seo_keywords || `${result.nom}, artisan ${result.speciality ? result.speciality.nom : ''}, annuaire, Auvergne-Rhône-Alpes, services, professionnels qualifiés`,
            entreprise: result,
            category: result.speciality ? result.speciality.category : null
        });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'entreprise.' });
    }
};

// Formulaire de contact pour une entreprise
exports.sendContactEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, cp, objet, message } = req.body;
        
        //validation côté serveur
        if (!nom || !prenom || !email || !cp || !objet || ! message){
            return res.status(400).send("Tous les champs sont obligatoires");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return res.status(400).send("Adresse email invalise");
        }

        if (message.length < 10) {
            return res.status(400).send('Le message doit contenir au moins 10 caractères.');
        }
        
        await contact.create({
            nom_expediteur: nom,
            prenom_expediteur: prenom,
            email_expediteur: email,
            code_postal: cp,
            objet: objet,
            message: message,
            id_entreprise: id
        });

        const art = await entreprise.findByPk(id);

        res.render('success', {
            title: 'Message envoyé',
            metaDescription: 'Confirmation d\'envoi du formulaire de contact',
            message: `Votre message a été envoyé à ${art.nom}.`
        });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi du message de contact.' });   
    }
};

/*Afficher les 3 entreprises du mois*/
exports.getTopEntreprises = async () => {
    try {
        const results = await entreprise.findAll({
            where: { top_entreprise: 1 },
            limit: 3,
            include: [{ model: speciality, as: 'speciality' }]
        });
        const entreprisesWithRatings = results.map(ent => {
            const note = parseFloat(ent.note) || 0;
            const fullStars = Math.floor(note);
            const hasHalfStars = (note - fullStars) >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalfStars ? 1 : 0);
            return {
                ...ent.toJSON(),
                fullStars: Array(fullStars).fill('full'),
                halfStars: hasHalfStars ? ['half'] : [],
                emptyStars: Array(emptyStars).fill('empty')
            };
        })
        return entreprisesWithRatings;

    } catch (error) {
        throw new Error('Une erreur est survenue lors de la récupération des top entreprises.');
    } 
};

/*liste de tous les artisans correspondant au mot-clé de recherche*/
exports.search = async (req, res) => {
    try {
        const query = req.query.q;

        const results = await entreprise.findAll({
            where: {
                nom: { [Op.like]: `%${query}%` }
            },
            include : [{ model: speciality, as: 'speciality' }]
        });

        let listeEntreprises = [];
        /* injection de 'specialiteNom' */
        results.forEach(ent => {
            const entData = ent.toJSON();
            entData.specialiteNom = ent.speciality ? ent.speciality.nom : 'Artisan';
            listeEntreprises.push(entData);
        });
        res.render('search', {
            title: `Résultats de recherche pour "${query}"`,
            metaDescription: `Découvrez les résultats de recherche pour "${query}" parmi les meilleurs artisans de la région Auvergne-Rhône-Alpes. Trouvez facilement des professionnels qualifiés pour tous vos projets de rénovation, construction et décoration liés à "${query}".`,
            metaKeywords: `artisans ${query}, annuaire ${query}, Auvergne-Rhône-Alpes, services ${query}, professionnels qualifiés ${query}`,
            entreprises: listeEntreprises,
            query: query
        });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la recherche d\'entreprises.' });
    }
};