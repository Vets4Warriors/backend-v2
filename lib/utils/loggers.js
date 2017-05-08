/**
 * Created by austin on 4/4/17.
 */

// Using the command line arguments to determine env
const winston = require('winston');
const expressWinston = require('express-winston');
const fs = require('fs');
const config = require('./config');

// Overwrite the 'notice' level for custom database logging
const levels = winston.config.syslog.levels;
const colors = winston.config.syslog.colors;
delete levels.notice;
delete colors.notice;
levels.database = 5;
colors.database = 'yellow';
winston.addColors(colors);

let httpLogger;
let logger;

// Create the log directory to store the logfiles
if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

switch (config.env) {
  case 'dev':
  case 'development':
    // Output to the console when in development or testing
    logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          colorize: true,
        }),
      ],
      levels,
    });
    httpLogger = expressWinston.logger({
      winstonInstance: logger,
      expressFormat: true,
      colorize: true,
    });
    break;
  case 'testing':
    logger = logger = new winston.Logger({
      transports: [
        new winston.transports.File({
          name: 'Testing Log',
          filename: './logs/testing.log',
          timestamp: true,
        })]
    });
    httpLogger = expressWinston.logger({
      transports: [
        new winston.transports.File({
          name: 'Testing Access Log',
          filename: './logs/testing-access.log',
          timestamp: true,
        }),
      ],
      expressFormat: true,
      colorize: true,
    });
    break;
  default: // Production
    // Write to specific log files in production
    logger = new winston.Logger({
      transports: [
        new winston.transports.File({
          name: 'Console Log',
          filename: `./logs/${config.logs.consoleFilename}`,
          timestamp: true,
        }),
        new winston.transports.File({
          name: 'Database Log',
          filename: `./logs/${config.logs.databaseFilename}`,
          timestamp: true,
          level: 'database',
        }),
        // Overwrite all error logging
        new winston.transports.File({
          name: 'Error Log',
          filename: `./logs/${config.logs.errorFilename}`,
          timestamp: true,
          level: 'error',
        }),
      ],
      levels,
    });

    httpLogger = expressWinston.logger({
      transports: [
        new winston.transports.File({
          name: 'Access Log',
          filename: `./logs/${config.logs.accessFilename}`,
          timestamp: true,
        }),
      ],
      expressFormat: true,
      colorize: true,
    });
}

module.exports = {
  httpLogger,
  logger,
};
