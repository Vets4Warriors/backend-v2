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
const mongoose = require('mongoose');

const Branch = mongoose.model('Organization');
const { ValidationError } = mongoose.SchemaType;
const baseUrl = '/branches';
const idUrl = `${baseUrl}/:id`;

router.get(baseUrl,
    // ensureLoggedIn(),
    async (req, res) => {
      // Look for query parameters
      const limit = req.query.limit || 100;
      const page = req.query.page || 1;
      try {
        const branchesRes = await Branch.paginate(req.query, {
          limit,
          page,
          lean: true, // Don't need Model objects
        });
        res.json(branchesRes.docs);
      } catch (err) {
        throw err;
        // throw createError(HttpStatus.BAD_REQUEST, `Can't search organizations`);
      }
    });

router.post(baseUrl,
    // Todo: Create branch
    // ensureLoggedIn(),
    async (req, res) => {
      // Should this be where we add the user id?
      const data = req.body;
      try {
        const branch = new Branch(data);
        await branch.save();
      } catch (err) {
        if (err instanceof ValidationError) {
          throw createError(HttpStatus.BAD_REQUEST, `New branch not valid: ${err}`)
        } else {
          throw err;
        }
      }
    }
);

router.get(idUrl,
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

router.delete(idUrl,
    // ensureLoggedIn(),
    async (req, res) => {
      const id = req.params.id;
      try {
        await Branch.findByIdAndRemove(id);
        res.status(HttpStatus.NO_CONTENT).send();
      } catch(err) {
        // Todo: categorize error
        throw createError(HttpStatus.NOT_FOUND, `Can't find branch by id: ${id}`);
      }
    });

router.put(idUrl,
    // ensureLoggedIn(),
    async (req, res) => {
      const id = req.params.id;
      try {
        const data = req.body;
        const org = await Branch.findByIdAndUpdate(id, data, { new: true }).exec();
        res.json(org);
      } catch(err) {
        // Todo: categorize error
        throw createError(HttpStatus.NOT_FOUND, `Can't find branch by id: ${id}`);
      }
    });

module.exports = router;
