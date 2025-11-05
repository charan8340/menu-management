const itemRepo = require('../repository/itemRepo');

exports.createItem = async (req, res) => {
  try {
    const item = await itemRepo.createItem(req.body);
    return res.status(201).json(item);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await itemRepo.getAllItems();
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// searching from all items by using cat-id or full name
exports.getItemBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    const rows = await itemRepo.getItemBySearch(search);
    if (!rows || rows.length === 0) return res.status(404).json({ message: 'Item not found' });
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET /api/category/:cid/sub_cat/:scid -> items for that category & subcategory
exports.getItemsByCategoryAndSubcategory = async (req, res) => {
  try {
    const { cid, scid } = req.params;
    const items = await itemRepo.getItemsByCategoryAndSubcategory(Number(cid), Number(scid));
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getItemsByCategory = async (req, res) => {
  try {
    const { cid } = req.params;
    const items = await itemRepo.getItemsByCategory(Number(cid));
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updated = await itemRepo.updateItem(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
