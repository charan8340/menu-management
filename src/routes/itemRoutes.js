const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.get('/category/:categoryId', itemController.getItemsByCategory);
router.get('/subcategory/:subCategoryId', itemController.getItemsBySubCategory);

module.exports = router;
