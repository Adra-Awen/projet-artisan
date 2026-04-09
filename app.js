const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const categoriesRouter = require('./src/routes/categoryRoutes');
const specialitiesRouter = require('./src/routes/specialityRoutes');
const entreprisesRouter = require('./src/routes/entrepriseRoutes');
// const contactRouter = require('./src/routes/contactRoutes');

const app = express();


// DATABASE CONNECTION
const { sequelize, category, entreprise, speciality, contact } = require('./src/models');
sequelize.authenticate()
    .then(() => {
        console.log('Base de données connectée avec succès.');
        return sequelize.sync({alter:true});
    })
    .then (() => {
        console.log('Modèles synchronisés avec la base de données.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(async (req, res, next) => {
    try {
        const categories = await category.findAll();
        res.locals.categories = categories;
        next();
    } catch (err) {
        next(err);
    }
});

// Routes
app.use('/categories', categoriesRouter);
app.use('/specialites', specialitiesRouter);
app.use('/entreprises', entreprisesRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
