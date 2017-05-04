require('dotenv').config({ path: './keys.private.env' }); // Setup environment
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const auth = require('./lib/auth');
const config = require('./lib/utils/config');
const { httpLogger, logger } = require('./lib/utils/loggers');
const { errorHandler, devErrorHandler, errorReporter } = require('./lib/errors');
const mongoConnect = require('./lib/utils/mongo');
const router = require('./lib/routes');

const app = express();
app.set('env', config.env);
// Templating engine
app.set('view engine', 'pug');

// Logging - to stdout in development, to files in production
app.use(httpLogger);

app.use(cors());

// Passport + session setup
app.use(session({
  secret: config.session.secret,
  saveUninitialized: true,
  resave: false
}));
const { strategy, deserializeUser, serializeUser } = auth;
passport.use(strategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
app.use(passport.initialize());
app.use(passport.session());

// Route setup
app.use(router);

if (app.get('env') === 'production') {
  // Static directory
  // The dist directory in the client is where angular builds to
  // In development, will be run separately
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  app.get('*', (req, res) => {
    // Send to the index
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });

  // @see https://expressjs.com/en/advanced/best-practice-performance.html#in-code
  // Compress everything
  const compression = require('compression');
  app.use(compression());

  // Error handling: Send less explicit errors in production
  app.use(errorHandler);
} else {
  // Development
  app.use(devErrorHandler);
  // Error handling: Send more explicit errors
}

app.use(errorReporter);

function start() {
  // Databse setup
  mongoConnect();

  app.listen(config.port, () => {
    logger.info(`${config.name} is listening on port ${config.port}`);
  });
}

// If run directly
if (require.main === module) {
  start();
}

// Exported for testing
module.exports = app;
module.exports.start = start;
