/**
 * Created by austin on 5/4/17.
 */
const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const mongoose = require('mongoose');
const Org = mongoose.model('Organization');

const baseUrl = '/organizations';

router.get(baseUrl,
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {

    });

router.get(`${baseUrl}/:id`,
    require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
      // Todo: Get Org by Id
      const id = req.params.id;
      Org.findById(id)
          .then((org) => {
            res.json(org);
          }).catch((err) => {
        // Error?
            throw createError(HttpStatus.NOT_FOUND, `Can't find org by id: ${id}`);
          });
    });

module.exports = router;
