// passport is what we will use for authentication
module.exports = function(app, User) {
  // load dependencies
  var passport = require('passport');
  var cookieParser = require('cookie-parser');
  var Sequelize = require('sequelize');
  var session = require('express-session');
  var db = require('../models');
  // this allows us to create an authentication system
  // with a username and password
  const LocalStrategy = require('passport-local');

// initalize sequelize with session store
  var SequelizeStore = require('connect-session-sequelize')(session.Store);

  var sequelize = new Sequelize(
    'rstimekeeping_db', 
    'root', 
    null, {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
  });

  var myStore = new SequelizeStore({
    db: sequelize
  });

  app.use(cookieParser())
  app.use(session({
    secret: 'keyboard cat',
    store: myStore,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
    })
  )

  myStore.sync();

  // db.sequelize.sync().then(function() {
  //   app.listen(PORT, function () {
  //       console.log('Server listening on PORT: ', PORT);
  //   });
  // });

  // log an error if there's an error
  myStore.on('error', console.error.bind(console, 'connection error:'));

  // log a message to the terminal when database connection is "open"
  myStore.once('open', function() {
    console.log('You are connected!');
  });

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!(user.password === password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  return passport;
}