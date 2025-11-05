const categoryRepo = require('../repository/categoryRepo');

exports.createCategory = async (req, res) => {
  try {
    const category = await categoryRepo.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryRepo.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await categoryRepo.updateCategory(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
