/**
 * Created by austin on 4/10/17.
 */

const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const ensureAuth = require('../auth');
const { wrap } = require('../errors');

const baseUrl = '/users';

router.post(baseUrl, ensureAuth,
    wrap(async (req, res) => {

    }));

router.get(`${baseUrl}/:id`, ensureAuth,
    wrap(async (req, res) => {

    }));

router.delete(`${baseUrl}/:id`, ensureAuth,
    wrap(async (req, res) => {
  // Data for user should be in req.user
  // Return a response with status HttpStatus.NO_CONTENT if successful
      await req.user.remove();
      res.status(HttpStatus.NO_CONTENT).send();
    }));

module.exports = router;
