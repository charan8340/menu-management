const subcategoryRepo = require('../repository/subcategoryRepo');

exports.createSubcategory = async (req, res) => {
  try {
    const sub = await subcategoryRepo.createSubcategory(req.body);
    return res.status(201).json(sub);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getSubcategoryById = async (req, res) => {
  try {
    const sub = await subcategoryRepo.getSubcategoryById(req.params.id);
    if (!sub) return res.status(404).json({ message: 'SubCategory not found' });
    return res.json(sub);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateSubcategory = async (req, res) => {
  try {
    const updated = await subcategoryRepo.updateSubcategory(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'SubCategory not found' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get all subcategories (full)
exports.getAllSubcategories = async (req, res) => {
  try {
    const list = await subcategoryRepo.getAllSubcategories ? await subcategoryRepo.getAllSubcategories() : [];
    return res.json(list);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
