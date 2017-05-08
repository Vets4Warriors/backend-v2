/**
 * Created by austin on 5/4/17.
 */

/**
 * Created by austin on 5/4/17.
 */
const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const { ensureLoggedIn } = require('connect-ensure-login');
const Branch = require('../models/Branch');

const baseUrl = '/branches';

router.get(baseUrl,
    // ensureLoggedIn(),
    async (req, res) => {
      // Todo:
      // Sort by query parameters
      res.json([]);
    });

router.post(baseUrl,
    // Todo: Create branch
    // ensureLoggedIn(),
    async (req, res) => {

    }
);

router.get(`${baseUrl}/:id`,
    // ensureLoggedIn(),
    async (req, res) => {
      const id = req.params.id;
      try {
        const branch = await Branch.findById(id);
        res.json(branch);
      } catch (err) {
        throw createError(HttpStatus.NOT_FOUND, `Can't find branch by id: ${id}`);
      }
    });

module.exports = router;
