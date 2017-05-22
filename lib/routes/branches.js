/**
 * Created by austin on 5/4/17.
 */

/**
 * Created by austin on 5/4/17.
 */
const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const mongoose = require('mongoose');
const ensureAuth = require('../auth');

const Branch = mongoose.model('Organization');
const { ValidationError } = mongoose.SchemaType;
const baseUrl = '/branches';
const idUrl = `${baseUrl}/:id`;

router.get(baseUrl, ensureAuth,
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

router.post(baseUrl, ensureAuth,
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

router.get(idUrl, ensureAuth,
    async (req, res) => {
      const id = req.params.id;
      try {
        const branch = await Branch.findById(id);
        res.json(branch);
      } catch (err) {
        throw createError(HttpStatus.NOT_FOUND, `Can't find branch by id: ${id}`);
      }
    });

router.delete(idUrl, ensureAuth,
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

router.put(idUrl, ensureAuth,
    async (req, res) => {
      const id = req.params.id;
      try {
        const data = req.body;
        const branch = await Branch.findByIdAndUpdate(id, data, { new: true }).exec();
        res.json(branch);
      } catch(err) {
        // Todo: categorize error
        throw createError(HttpStatus.NOT_FOUND, `Can't find branch by id: ${id}`);
      }
    });


// Reviews
const reviewUrl = `${idUrl}/reviews`;
router.get(reviewUrl, ensureAuth,
    async (req, res) => {
      const branchId = req.params.id;
      try {
        const branch = await Branch.findById(branchId);
        res.json(branch.reviews);
      } catch(err) {
        // Todo: categorize error
        throw createError(HttpStatus.NOT_FOUND, `Can't find branch by id: ${id}`);
      }
    });

router.get(reviewUrl, ensureAuth,
    async (req, res) => {
      const branchId = req.params.id;
      try {
        const branch = await Branch.findById(branchId);
        const data = req.body;
        branch.reviews.push(data);
        await branch.save();
        const review = branch.reviews[branch.reviews.length - 1];
        res.json(review);
      } catch(err) {
        // Todo: categorize error
        if (err instanceof ValidationError) {
          throw createError(HttpStatus.BAD_REQUEST, `New branch not valid: ${err}`)
        } else {
          throw createError(HttpStatus.NOT_FOUND, `Can't find branch by id: ${id}`);
        }
      }
    });

module.exports = router;
