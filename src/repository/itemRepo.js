const { Item, SubCategory, Category } = require('../models');
const { Op } = require('sequelize');

const itemRepo = {
  // create item under subCategoryId (data.subCategoryId required)
  // inherit tax from subcategory then category if missing
  async createItem(data) {
    if (!data.subCategoryId) throw new Error('subCategoryId is required');

    const sub = await SubCategory.findByPk(data.subCategoryId);
    if (!sub) throw new Error('SubCategory not found');

    // inherit tax from subcategory if not specified
    if (data.tax_applicable === undefined) data.tax_applicable = sub.tax_applicable;
    if (data.tax === undefined) data.tax = sub.tax;
    // if still undefined, inherit from category
    if (data.tax === undefined || data.tax_applicable === undefined) {
      const cat = await Category.findByPk(sub.categoryId);
      if (cat) {
        if (data.tax_applicable === undefined) data.tax_applicable = cat.tax_applicable;
        if (data.tax === undefined) data.tax = cat.tax;
      }
    }

    // compute total_amount
    data.total_amount = Number(data.base_amount) - Number(data.discount || 0);

    return await Item.create(data);
  },

  // get all items (full details)
  async getAllItems() {
    return await Item.findAll({
      include: [{ model: SubCategory, attributes: ['id', 'name'] }]
    });
  },

  // get items under a subcategory
  async getItemsBySubCategory(subCategoryId) {
    return await Item.findAll({
      where: { subCategoryId },
      include: [{ model: SubCategory, attributes: ['id', 'name'] }]
    });
  },

  // get items under a category (join via subcategory)
  async getItemsByCategory(categoryId) {
    return await Item.findAll({
      include: [{
        model: SubCategory,
        where: { categoryId },
        attributes: ['id', 'name']
      }]
    });
  },

  // get items for specific categoryId + subCategoryId (main flow)
  async getItemsByCategoryAndSubcategory(categoryId, subCategoryId) {
    return await Item.findAll({
      include: [{
        model: SubCategory,
        where: { id: subCategoryId, categoryId },
        attributes: ['id', 'name']
      }]
    });
  },

  // get item(s) by search param (id or name)
  async getItemBySearch(param) {
    const where = isNaN(param) ? { name: { [Op.like]: `%${param}%` } } : { id: param };
    return await Item.findAll({
      where,
      include: [{ model: SubCategory, attributes: ['id', 'name'] }]
    });
  },

  // update item
  async updateItem(id, data) {
    // recalc total_amount if base_amount/discount present
    if (data.base_amount !== undefined || data.discount !== undefined) {
      const base = data.base_amount !== undefined ? data.base_amount : undefined;
      const discount = data.discount !== undefined ? data.discount : undefined;
      // If both missing, don't override; if base missing need to fetch existing base to compute
      if (base === undefined) {
        const existing = await Item.findByPk(id);
        if (!existing) throw new Error('Item not found');
        data.total_amount = Number(existing.base_amount) - Number(discount || existing.discount || 0);
      } else {
        data.total_amount = Number(base) - Number(discount || 0);
      }
    }

    const [updated] = await Item.update(data, { where: { id } });
    return updated ? await Item.findByPk(id) : null;
  }
};

module.exports = itemRepo;
