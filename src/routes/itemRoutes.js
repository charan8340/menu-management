const express = require('express');
const router = express.Router();
const itemService = require('../services/itemService');

router.get('/', itemService.getAllItems);

// search either by using id or full name of category
router.get('/:search', itemService.getItemBySearch);

// new Item we need to also include cat Id
router.post('/', itemService.createItem);

router.patch('/:id', itemService.updateItem);

module.exports = router;