import { SubCategory, Category } from "../models/index.js";

export const subcategoryRepo = {
  async createSubcategory(data) {
    // If tax details not provided, inherit from parent Category
    if (data.categoryId) {
      const parentCategory = await Category.findByPk(data.categoryId);
      if (parentCategory && data.taxApplicable === undefined) {
        data.taxApplicable = parentCategory.taxApplicable;
        data.taxType = parentCategory.taxType;
        data.taxRate = parentCategory.taxRate;
      }
    }
    return await SubCategory.create(data);
  },

  async getAllSubcategories() {
    return await SubCategory.findAll({ include: [Category] });
  },

  async getSubcategoryById(id) {
    return await SubCategory.findByPk(id, { include: [Category] });
  },

  async updateSubcategory(id, data) {
    const [updated] = await SubCategory.update(data, { where: { id } });
    return updated ? await SubCategory.findByPk(id, { include: [Category] }) : null;
  },

  async deleteSubcategory(id) {
    return await SubCategory.destroy({ where: { id } });
  },
};
