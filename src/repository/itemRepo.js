const { Item, Category, SubCategory } = require('../models');

exports.getAllItems = async () => {
  return await Item.findAll({ include: [Category, SubCategory] });
};

exports.getItemsByCategory = async (categoryId) => {
  return await Item.findAll({
    where: { categoryId },
    include: [Category, SubCategory],
  });
};

exports.getItemsBySubCategory = async (subCategoryId) => {
  return await Item.findAll({
    where: { subCategoryId },
    include: [Category, SubCategory],
  });
};

exports.getItemById = async (id) => {
  return await Item.findByPk(id, { include: [Category, SubCategory] });
};
