const subcategoryRepo = require('../repository/subcategoryRepo');

exports.createSubcategory = async (req, res) => {
  try {
    const subcategory = await subcategoryRepo.createSubcategory(req.body);
    res.status(201).json({ success: true, data: subcategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await subcategoryRepo.getAllSubcategories();
    res.status(200).json({ success: true, data: subcategories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
