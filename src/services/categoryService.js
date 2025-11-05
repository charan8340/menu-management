const categoryRepo = require('../repository/categoryRepo');
const subcatRepo = require('../repository/subcategoryRepo');

exports.createCategory = async (req, res) => {
  try {
    const data = await categoryRepo.createCategory(req.body);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const list = await categoryRepo.getAllCategories();
    return res.json(list);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// search by full name or id
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { cid } = req.params;
    const subcats = await subcatRepo.getSubCategoriesByCategoryId(cid);
    return res.json(subcats);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getCategoryByIdOrName = async (req, res) => {
  try {
    const identifier = req.params.identifier;
    const cat = isNaN(identifier)
      ? await categoryRepo.getCategoryByName(identifier)
      : await categoryRepo.getCategoryById(Number(identifier));
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    return res.json(cat);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await categoryRepo.updateCategory(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
