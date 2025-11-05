const itemRepo = require('../repository/itemRepo');

exports.createItem = async (req, res) => {
  try {
    const item = await itemRepo.createItem(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await itemRepo.getAllItems();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
