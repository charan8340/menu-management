const express = require('express');
const router = express.Router();
const subcategoryService = require('../services/subcategoryService');

// we need to include category id.
router.post('/', subcategoryService.createSubcategory);

router.get('/:id', subcategoryService.getSubcategoryById);

router.patch('/:id', subcategoryService.updateSubcategory);

module.exports = router;
