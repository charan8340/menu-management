const { Category, SubCategory } = require('../models');

const categoryRepo = {
  // create category
  async createCategory(data) {
    return await Category.create(data);
  },

  // list categories but only id + name (for frontend listing)
  async getAllCategories() {
    return await Category.findAll({ attributes: ['id', 'name'] });
  },

  // get category by id (with its subcategories if needed)
  async getCategoryById(id) {
    return await Category.findByPk(id, {
      include: { model: SubCategory, attributes: ['id', 'name'] }
    });
  },

  // get category by name
  async getCategoryByName(name) {
    return await Category.findOne({
      where: { name },
      include: { model: SubCategory, attributes: ['id', 'name'] }
    });
  },

  // update category
  async updateCategory(id, data) {
    const [updated] = await Category.update(data, { where: { id } });
    return updated ? await Category.findByPk(id) : null;
  }
};

module.exports = categoryRepo;
