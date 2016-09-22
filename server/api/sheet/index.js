'use strict';


import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./sheet.controller');

var router = express.Router();

router.get('/admin', auth.hasRole('admin'), controller.adminGetSheets);
router.get('/', auth.hasRole('user'), controller.userSheet);
router.get('/:id', controller.show);
router.get('/answer/:id', controller.showAnswer);
router.get('/answerCheck/:id', controller.showAnswerCheck);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
