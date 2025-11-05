const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');

router.get('/', categoryService.getAllCategories);
router.post('/', categoryService.createCategory);
router.get('/:search', categoryService.getCategoryByIdOrName); // by id or name full
router.patch('/:id', categoryService.updateCategory);

// all subcategories for a category
router.get('/:cid/sub', categoryService.getSubcategoriesByCategory);

module.exports = router;