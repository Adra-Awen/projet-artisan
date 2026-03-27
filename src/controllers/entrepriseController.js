const { entreprise, speciality, contact } = require('../models/index');

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

exports.sendContactEmail = async (req, res) => {
    console.log('Données reçues pour le contact :', req.body);
    try {
        const { id } = req.params;
        const { nom, prenom, email, cp, objet, message } = req.body;

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
            message: `Votre message a été envoyé à ${art.nom}.`
        });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message de contact :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi du message de contact.' });   
    }
};