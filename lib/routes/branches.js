/**
 * Created by austin on 5/4/17.
 */

/**
 * Created by austin on 5/4/17.
 */
const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const Branch = require('../models/Branch');

const baseUrl = '/branches';

router.get(baseUrl,
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {

    });

router.get(`${baseUrl}/:id`,
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {

    });


module.exports = router;
