/**
 * Created by austin on 3/3/17.
 */
const reqDir = require('require-directory');
const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const routes = reqDir(module);

// Cycle through all the routes and add them to the main app router
for (const key of Object.keys(routes)) {
  router.use(routes[key]);
}

module.exports = router;
