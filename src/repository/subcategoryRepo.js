const { SubCategory, Category, Item } = require('../models');

const subcategoryRepo = {
  // create subcategory under a categoryId (expects data.categoryId present)
  // inherits tax fields from Category if not provided
  async createSubcategory(data) {
    if (!data.categoryId) throw new Error('categoryId is required');
    const category = await Category.findByPk(data.categoryId);
    if (!category) throw new Error('Category not found');

    // inherit tax if not provided explicitly
    if (data.tax_applicable === undefined) data.tax_applicable = category.tax_applicable;
    if (data.tax === undefined) data.tax = category.tax;
    if (data.tax_type === undefined) data.tax_type = category.tax_type;

    return await SubCategory.create(data);
  },

  // get subcategories under a category (id + name only)
  async getSubCategoriesByCategoryId(categoryId) {
    return await SubCategory.findAll({
      where: { categoryId },
      attributes: ['id', 'name']
    });
  },

  // get single subcategory by id (full)
  async getSubcategoryById(id) {
    return await SubCategory.findByPk(id);
  },

  // update subcategory
  async updateSubcategory(id, data) {
    const [updated] = await SubCategory.update(data, { where: { id } });
    return updated ? await SubCategory.findByPk(id) : null;
  }
};

module.exports = subcategoryRepo;
