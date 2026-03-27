const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./src/routes/categoryRoutes');
const specialitiesRouter = require('./src/routes/specialityRoutes');
const entreprisesRouter = require('./src/routes/entrepriseRoutes');
// const contactRouter = require('./src/routes/contactRoutes');

const { category } = require('./src/models');

const app = express();

// DATABASE CONNECTION //
const { sequelize } = require('./src/models');
sequelize.authenticate()
    .then(() => {
        console.log('Base de données connectée avec succès.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/users', usersRouter);
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
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

module.exports = app;
