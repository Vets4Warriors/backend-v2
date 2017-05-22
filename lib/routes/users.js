/**
 * Created by austin on 4/10/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const ensureAuth = require('../auth');

const baseUrl = '/users';

router.delete(`${baseUrl}/:id`, ensureAuth,
    (req, res) => {
  // Data for user should be in req.user
  // Return a response with status HttpStatus.NO_CONTENT if successful
      req.user.remove().then(() => {
        req.logout();
        req.session.destroy();
        res.status(HttpStatus.NO_CONTENT).send();
      });
    });

module.exports = router;
