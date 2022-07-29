const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const notionController = require('../../controllers/notion.controller');
const router = express.Router();

router.route('/call-back1').get(notionController.handleCallback);

module.exports = router;
